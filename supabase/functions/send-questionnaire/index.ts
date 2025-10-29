import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuestionnaireRequest {
  formData: { [key: string]: string };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: QuestionnaireRequest = await req.json();

    console.log("Received questionnaire submission");

    // Format the email content as a table
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 30px; margin-bottom: 15px; font-size: 18px; background-color: #ecf0f1; padding: 10px; border-left: 4px solid #3498db; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #3498db; color: white; font-weight: bold; width: 40%; }
    td { background-color: #f9f9f9; }
    tr:hover td { background-color: #f0f0f0; }
    .footer { text-align: center; margin-top: 30px; color: #7f8c8d; font-size: 14px; padding-top: 20px; border-top: 2px solid #ecf0f1; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Personal Injury Questionnaire Response</h1>
    <p style="color: #7f8c8d; font-size: 14px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    
    <h2>SECTION 1: PERSONAL INFORMATION</h2>
    <table>
      <tr><th>Full Name</th><td>${formData.fullName || 'N/A'}</td></tr>
      <tr><th>Date of Birth</th><td>${formData.dateOfBirth || 'N/A'}</td></tr>
      <tr><th>ID Type</th><td>${formData.idType || 'N/A'}</td></tr>
      <tr><th>Email</th><td>${formData.email || 'N/A'}</td></tr>
      <tr><th>Full Address</th><td>${formData.fullAddress || 'N/A'}</td></tr>
      <tr><th>Occupation</th><td>${formData.occupation || 'N/A'}</td></tr>
      <tr><th>Work Type</th><td>${formData.workType || 'N/A'}</td></tr>
      <tr><th>Living With</th><td>${formData.livingWith || 'N/A'}</td></tr>
      <tr><th>Number of Children</th><td>${formData.numberOfChildren || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 2: ACCIDENT DETAILS</h2>
    <table>
      <tr><th>Date of Accident</th><td>${formData.accidentDate || 'N/A'}</td></tr>
      <tr><th>Accident Time</th><td>${formData.accidentTime || 'N/A'}</td></tr>
      <tr><th>Position in Vehicle</th><td>${formData.vehiclePosition || 'N/A'}</td></tr>
      <tr><th>Vehicle Type</th><td>${formData.vehicleType || 'N/A'}</td></tr>
      <tr><th>Vehicle Location</th><td>${formData.vehicleLocation || 'N/A'}</td></tr>
      <tr><th>Vehicle Status</th><td>${formData.vehicleStatus || 'N/A'}</td></tr>
      <tr><th>Impact Location</th><td>${formData.impactLocation || 'N/A'}</td></tr>
      <tr><th>How Jolted</th><td>${formData.howJolted || 'N/A'}</td></tr>
      <tr><th>Wearing Seatbelt</th><td>${formData.wearingSeatbelt || 'N/A'}</td></tr>
      <tr><th>Airbags Off</th><td>${formData.airbagsOff || 'N/A'}</td></tr>
      <tr><th>Vehicle Damage</th><td>${formData.vehicleDamage || 'N/A'}</td></tr>
      <tr><th>Need Help</th><td>${formData.needHelp || 'N/A'}</td></tr>
      <tr><th>Other Vehicle Type</th><td>${formData.otherVehicleType || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 3: NECK PAIN</h2>
    <table>
      <tr><th>Neck Pain</th><td>${formData.neckPain || 'N/A'}</td></tr>
      <tr><th>Neck Side</th><td>${formData.neckSide || 'N/A'}</td></tr>
      <tr><th>Pain Start</th><td>${formData.neckPainStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.neckInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.neckCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.neckResolvedDays || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 4: SHOULDER PAIN</h2>
    <table>
      <tr><th>Shoulder Pain</th><td>${formData.shoulderPain || 'N/A'}</td></tr>
      <tr><th>Shoulder Side</th><td>${formData.shoulderSide || 'N/A'}</td></tr>
      <tr><th>Pain Start</th><td>${formData.shoulderPainStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.shoulderInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.shoulderCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.shoulderResolvedDays || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 5: BACK PAIN</h2>
    <table>
      <tr><th>Back Pain</th><td>${formData.backPain || 'N/A'}</td></tr>
      <tr><th>Back Location</th><td>${formData.backLocation || 'N/A'}</td></tr>
      <tr><th>Pain Start</th><td>${formData.backPainStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.backInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.backCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.backResolvedDays || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 6: HEADACHE</h2>
    <table>
      <tr><th>Headache</th><td>${formData.headache || 'N/A'}</td></tr>
      <tr><th>Headache Start</th><td>${formData.headacheStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.headacheInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.headacheCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.headacheResolvedDays || 'N/A'}</td></tr>
      <tr><th>Medical History</th><td>${formData.headacheMedicalHistory || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 7: TRAVEL ANXIETY</h2>
    <table>
      <tr><th>Travel Anxiety</th><td>${formData.travelAnxiety || 'N/A'}</td></tr>
      <tr><th>Back to Driving</th><td>${formData.backToDriving || 'N/A'}</td></tr>
      <tr><th>Cautious Driver</th><td>${formData.cautiousDriver || 'N/A'}</td></tr>
      <tr><th>Looking Rear Mirror</th><td>${formData.lookingRearMirror || 'N/A'}</td></tr>
      <tr><th>Prevented Driving</th><td>${formData.preventedDriving || 'N/A'}</td></tr>
      <tr><th>Anxiety Start</th><td>${formData.anxietyStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.anxietyInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.anxietyCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.anxietyResolvedDays || 'N/A'}</td></tr>
      <tr><th>Medical History</th><td>${formData.anxietyMedicalHistory || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 8: BRUISING/SCARRING</h2>
    <table>
      <tr><th>Bruising</th><td>${formData.bruising || 'N/A'}</td></tr>
      <tr><th>Bruising Location</th><td>${formData.bruisingLocation || 'N/A'}</td></tr>
      <tr><th>When Noticed</th><td>${formData.bruisingNoticed || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.bruisingInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.bruisingCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.bruisingResolvedDays || 'N/A'}</td></tr>
      <tr><th>Visible Scar</th><td>${formData.visibleScar || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 9: OTHER INJURIES</h2>
    <table>
      <tr><th>Other Injury</th><td>${formData.otherInjury || 'N/A'}</td></tr>
      <tr><th>Injury Name</th><td>${formData.injuryName || 'N/A'}</td></tr>
      <tr><th>Injury Start</th><td>${formData.injuryStart || 'N/A'}</td></tr>
      <tr><th>Initial Severity</th><td>${formData.injuryInitialSeverity || 'N/A'}</td></tr>
      <tr><th>Current Severity</th><td>${formData.injuryCurrentSeverity || 'N/A'}</td></tr>
      <tr><th>Resolved Days</th><td>${formData.injuryResolvedDays || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 10: TREATMENT</h2>
    <table>
      <tr><th>Treatment at Scene</th><td>${formData.treatmentAtScene || 'N/A'}</td></tr>
      <tr><th>Treatment Details</th><td>${formData.treatmentDetails || 'N/A'}</td></tr>
      <tr><th>Went to A&E</th><td>${formData.wentToAE || 'N/A'}</td></tr>
      <tr><th>Hospital Name</th><td>${formData.hospitalName || 'N/A'}</td></tr>
      <tr><th>Hospital Treatment</th><td>${formData.hospitalTreatment || 'N/A'}</td></tr>
      <tr><th>Went to GP</th><td>${formData.wentToGP || 'N/A'}</td></tr>
      <tr><th>GP Days After</th><td>${formData.gpDaysAfter || 'N/A'}</td></tr>
      <tr><th>Current Treatment</th><td>${formData.currentTreatment || 'N/A'}</td></tr>
      <tr><th>Physiotherapy Sessions</th><td>${formData.physiotherapySessions || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 11: IMPACT ON LIFE</h2>
    <table>
      <tr><th>Days Off Work</th><td>${formData.daysOffWork || 'N/A'}</td></tr>
      <tr><th>Light Duty Days</th><td>${formData.lightDutyDays || 'N/A'}</td></tr>
      <tr><th>Work Difficulties</th><td>${formData.workDifficulties || 'N/A'}</td></tr>
      <tr><th>Sleep Disturbance</th><td>${formData.sleepDisturbance || 'N/A'}</td></tr>
      <tr><th>Sleep Details</th><td>${formData.sleepDisturbanceDetails || 'N/A'}</td></tr>
      <tr><th>Domestic Effect</th><td>${formData.domesticEffect || 'N/A'}</td></tr>
      <tr><th>Domestic Details</th><td>${formData.domesticEffectDetails || 'N/A'}</td></tr>
      <tr><th>Sport/Leisure Effect</th><td>${formData.sportLeisureEffect || 'N/A'}</td></tr>
      <tr><th>Sport/Leisure Details</th><td>${formData.sportLeisureEffectDetails || 'N/A'}</td></tr>
      <tr><th>Social Life Effect</th><td>${formData.socialLifeEffect || 'N/A'}</td></tr>
      <tr><th>Social Life Details</th><td>${formData.socialLifeEffectDetails || 'N/A'}</td></tr>
    </table>

    <h2>SECTION 12: PREVIOUS HISTORY</h2>
    <table>
      <tr><th>Previous Accident</th><td>${formData.previousAccident || 'N/A'}</td></tr>
      <tr><th>Previous Accident Date</th><td>${formData.previousAccidentDate || 'N/A'}</td></tr>
      <tr><th>Recovered Completely</th><td>${formData.recoveredCompletely || 'N/A'}</td></tr>
      <tr><th>Made Worse</th><td>${formData.madeWorse || 'N/A'}</td></tr>
      <tr><th>Previous Conditions</th><td>${formData.previousConditions || 'N/A'}</td></tr>
      <tr><th>Anything Else</th><td>${formData.anythingElse || 'N/A'}</td></tr>
      <tr><th>Anything Else Details</th><td>${formData.anythingElseDetails || 'N/A'}</td></tr>
    </table>

    <div class="footer">
      <p>This questionnaire was submitted via the Personal Injury Assessment Form</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Questionnaire <onboarding@resend.dev>",
      to: ["drawais@gmail.com"],
      subject: `Personal Injury Questionnaire - ${formData.fullName || 'Anonymous'}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
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
