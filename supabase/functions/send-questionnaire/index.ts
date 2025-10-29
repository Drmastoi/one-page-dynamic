import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema matching frontend
const validateSubmission = (data: any): { valid: boolean; error?: string } => {
  const requiredFields = [
    'fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'dateOfBirth',
    'accidentDate', 'accidentLocation', 'accidentDescription', 'policeReportFiled', 'faultParty',
    'vehicleLocation', 'vehicleType', 'vehicleDamage', 'impactLocation', 'otherVehicleType',
    'immediatePain', 'currentPain', 'injuryDescription', 'medicalTreatment', 'ongoingTreatment',
    'whoLivesWithYou', 'witnesses', 'insuranceCompany', 'claimFiled'
  ];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  const stringLimits: Record<string, number> = {
    fullName: 100, email: 255, phone: 20, address: 200, city: 100, state: 50, zipCode: 10,
    accidentLocation: 300, accidentDescription: 5000, injuryDescription: 5000,
    witnessDetails: 2000, insuranceCompany: 200, policyNumber: 100,
    hospitalName: 200, doctorName: 200, policeReportNumber: 100
  };

  for (const [field, limit] of Object.entries(stringLimits)) {
    if (data[field] && data[field].length > limit) {
      return { valid: false, error: `${field} exceeds maximum length of ${limit} characters` };
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.dateOfBirth) || !dateRegex.test(data.accidentDate)) {
    return { valid: false, error: 'Invalid date format' };
  }

  const accidentDate = new Date(data.accidentDate);
  if (accidentDate > new Date()) {
    return { valid: false, error: 'Accident date cannot be in the future' };
  }

  return { valid: true };
};

// Rate limiting
const checkRateLimit = async (ipAddress: string): Promise<{ allowed: boolean; remaining?: number }> => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const maxSubmissionsPerHour = 5;

  try {
    const { data: recentSubmissions, error: queryError } = await supabase
      .from('submission_rate_limits')
      .select('submission_count')
      .eq('ip_address', ipAddress)
      .gte('window_start', oneHourAgo)
      .order('window_start', { ascending: false })
      .limit(1)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      console.error('Rate limit query error:', queryError);
      return { allowed: true };
    }

    if (!recentSubmissions) {
      const { error: insertError } = await supabase
        .from('submission_rate_limits')
        .insert({
          ip_address: ipAddress,
          submission_count: 1,
          window_start: new Date().toISOString()
        });

      if (insertError) {
        console.error('Rate limit insert error:', insertError);
      }

      return { allowed: true, remaining: maxSubmissionsPerHour - 1 };
    }

    if (recentSubmissions.submission_count >= maxSubmissionsPerHour) {
      return { allowed: false, remaining: 0 };
    }

    const { error: updateError } = await supabase
      .from('submission_rate_limits')
      .update({ submission_count: recentSubmissions.submission_count + 1 })
      .eq('ip_address', ipAddress)
      .gte('window_start', oneHourAgo);

    if (updateError) {
      console.error('Rate limit update error:', updateError);
    }

    return { 
      allowed: true, 
      remaining: maxSubmissionsPerHour - recentSubmissions.submission_count - 1 
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    return { allowed: true };
  }
};

// HTML escape to prevent XSS
const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Submission request from IP:', clientIP);

    // Check rate limit
    const rateLimitResult = await checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(
        JSON.stringify({ 
          error: 'Too many submissions. Please try again later.',
          retryAfter: 3600 
        }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '3600',
            ...corsHeaders 
          } 
        }
      );
    }

    console.log("Received questionnaire submission");
    const submissionData = await req.json();
    
    // Validate submission
    const validation = validateSubmission(submissionData);
    if (!validation.valid) {
      console.log('Validation failed:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Save to database
    const { error: dbError } = await supabase
      .from("questionnaire_submissions")
      .insert({
        full_name: submissionData.fullName,
        email: submissionData.email,
        phone: submissionData.phone,
        address: submissionData.address,
        city: submissionData.city,
        state: submissionData.state,
        zip_code: submissionData.zipCode,
        date_of_birth: submissionData.dateOfBirth,
        accident_date: submissionData.accidentDate,
        accident_location: submissionData.accidentLocation,
        accident_description: submissionData.accidentDescription,
        police_report_filed: submissionData.policeReportFiled,
        police_report_number: submissionData.policeReportNumber || null,
        fault_party: submissionData.faultParty,
        weather_conditions: submissionData.weatherConditions || null,
        road_conditions: submissionData.roadConditions || null,
        traffic_conditions: submissionData.trafficConditions || null,
        vehicle_location: submissionData.vehicleLocation,
        vehicle_type: submissionData.vehicleType,
        vehicle_damage: submissionData.vehicleDamage,
        impact_location: submissionData.impactLocation,
        other_vehicle_type: submissionData.otherVehicleType,
        immediate_pain: submissionData.immediatePain,
        current_pain: submissionData.currentPain,
        injury_description: submissionData.injuryDescription,
        medical_treatment: submissionData.medicalTreatment,
        hospital_name: submissionData.hospitalName || null,
        doctor_name: submissionData.doctorName || null,
        ongoing_treatment: submissionData.ongoingTreatment,
        who_lives_with_you: submissionData.whoLivesWithYou,
        witnesses: submissionData.witnesses,
        witness_details: submissionData.witnessDetails || null,
        insurance_company: submissionData.insuranceCompany,
        policy_number: submissionData.policyNumber || null,
        claim_filed: submissionData.claimFiled,
        photo_urls: submissionData.photoUrls || [],
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission. Please try again.' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log("Saved to database successfully");

    // Create HTML table for emails with escaping
    const createTableHTML = (data: any, title: string) => {
      const fields = [
        { label: "Full Name", value: data.fullName },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Address", value: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}` },
        { label: "Date of Birth", value: data.dateOfBirth },
        { label: "Accident Date", value: data.accidentDate },
        { label: "Accident Location", value: data.accidentLocation },
        { label: "Accident Description", value: data.accidentDescription },
        { label: "Police Report Filed", value: data.policeReportFiled },
        { label: "Police Report Number", value: data.policeReportNumber },
        { label: "Fault Party", value: data.faultParty },
        { label: "Weather Conditions", value: data.weatherConditions },
        { label: "Road Conditions", value: data.roadConditions },
        { label: "Traffic Conditions", value: data.trafficConditions },
        { label: "Vehicle Location", value: data.vehicleLocation },
        { label: "Vehicle Type", value: data.vehicleType },
        { label: "Vehicle Damage", value: data.vehicleDamage },
        { label: "Impact Location", value: data.impactLocation },
        { label: "Other Vehicle Type", value: data.otherVehicleType },
        { label: "Immediate Pain", value: data.immediatePain },
        { label: "Current Pain", value: data.currentPain },
        { label: "Injury Description", value: data.injuryDescription },
        { label: "Medical Treatment", value: data.medicalTreatment },
        { label: "Hospital Name", value: data.hospitalName },
        { label: "Doctor Name", value: data.doctorName },
        { label: "Ongoing Treatment", value: data.ongoingTreatment },
        { label: "Who Lives With You", value: data.whoLivesWithYou },
        { label: "Witnesses", value: data.witnesses },
        { label: "Witness Details", value: data.witnessDetails },
        { label: "Insurance Company", value: data.insuranceCompany },
        { label: "Policy Number", value: data.policyNumber },
        { label: "Claim Filed", value: data.claimFiled },
      ];

      const rows = fields
        .filter(({ value }) => value)
        .map(
          ({ label, value }) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: 600; background-color: #f9fafb; color: #374151; width: 35%;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 12px; color: #1f2937;">
            ${escapeHtml(String(value))}
          </td>
        </tr>
      `
        )
        .join("");

      const photoSection = data.photoUrls && data.photoUrls.length > 0
        ? `<div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
             <h3 style="color: #374151; margin: 0 0 10px 0;">Accident Photos:</h3>
             ${data.photoUrls.map((url: string) => `<p style="margin: 5px 0;"><a href="${escapeHtml(url)}" style="color: #667eea;">${escapeHtml(url)}</a></p>`).join("")}
           </div>`
        : "";

      return `
        <div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 24px;">${escapeHtml(title)}</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ${rows}
          </table>
          ${photoSection}
          <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;
    };

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Personal Injury Questionnaire <onboarding@resend.dev>",
      to: [submissionData.email],
      subject: "We Received Your Questionnaire - Confirmation",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You!</h1>
          </div>
          <div style="background: white; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${escapeHtml(submissionData.fullName)},</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We have successfully received your personal injury questionnaire. Our team will review your submission and contact you shortly.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you have any immediate questions or concerns, please don't hesitate to reach out to us.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Best regards,</p>
              <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 5px 0 0 0;">Personal Injury Team</p>
            </div>
          </div>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent to user:", userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Personal Injury Questionnaire <onboarding@resend.dev>",
      to: ["drawais@gmail.com"],
      subject: "New Questionnaire Submission",
      html: createTableHTML(submissionData, "New Questionnaire Submission"),
    });

    console.log("Notification email sent to admin:", adminEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Submission received successfully',
        remaining: rateLimitResult.remaining
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-questionnaire function:", error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
