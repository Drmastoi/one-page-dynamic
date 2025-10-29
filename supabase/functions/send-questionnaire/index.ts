import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received questionnaire submission");
    const submissionData = await req.json();

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from("questionnaire_submissions")
      .insert([
        {
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
        },
      ])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Saved to database:", dbData);

    // Create HTML table for emails
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
            ${label}
          </td>
          <td style="padding: 12px; color: #1f2937;">
            ${value}
          </td>
        </tr>
      `
        )
        .join("");

      const photoSection = data.photoUrls && data.photoUrls.length > 0
        ? `<div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
             <h3 style="color: #374151; margin: 0 0 10px 0;">Accident Photos:</h3>
             ${data.photoUrls.map((url: string) => `<p style="margin: 5px 0;"><a href="${url}" style="color: #667eea;">${url}</a></p>`).join("")}
           </div>`
        : "";

      return `
        <div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 24px;">${title}</h2>
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
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${submissionData.fullName},</p>
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
        dbData,
        userEmail: userEmailResponse,
        adminEmail: adminEmailResponse,
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
