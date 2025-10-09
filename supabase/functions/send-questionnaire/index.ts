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

    // Format the email content
    const emailContent = `
<h2>Personal Injury Questionnaire Response</h2>

<h3>SECTION 1: PERSONAL INFORMATION</h3>
<ul>
  <li><strong>Full Name:</strong> ${formData.fullName || 'N/A'}</li>
  <li><strong>Date of Birth:</strong> ${formData.dateOfBirth || 'N/A'}</li>
  <li><strong>ID Type:</strong> ${formData.idType || 'N/A'}</li>
  <li><strong>Email:</strong> ${formData.email || 'N/A'}</li>
  <li><strong>Full Address:</strong> ${formData.fullAddress || 'N/A'}</li>
  <li><strong>Occupation:</strong> ${formData.occupation || 'N/A'}</li>
  <li><strong>Work Type:</strong> ${formData.workType || 'N/A'}</li>
  <li><strong>Living With:</strong> ${formData.livingWith || 'N/A'}</li>
  <li><strong>Number of Children:</strong> ${formData.numberOfChildren || 'N/A'}</li>
</ul>

<h3>SECTION 2: ACCIDENT DETAILS</h3>
<ul>
  <li><strong>Date of Accident:</strong> ${formData.accidentDate || 'N/A'}</li>
  <li><strong>Accident Time:</strong> ${formData.accidentTime || 'N/A'}</li>
  <li><strong>Position in Vehicle:</strong> ${formData.vehiclePosition || 'N/A'}</li>
  <li><strong>Vehicle Type:</strong> ${formData.vehicleType || 'N/A'}</li>
  <li><strong>Vehicle Location:</strong> ${formData.vehicleLocation || 'N/A'}</li>
  <li><strong>Vehicle Status:</strong> ${formData.vehicleStatus || 'N/A'}</li>
  <li><strong>Impact Location:</strong> ${formData.impactLocation || 'N/A'}</li>
  <li><strong>How Jolted:</strong> ${formData.howJolted || 'N/A'}</li>
  <li><strong>Wearing Seatbelt:</strong> ${formData.wearingSeatbelt || 'N/A'}</li>
  <li><strong>Airbags Off:</strong> ${formData.airbagsOff || 'N/A'}</li>
  <li><strong>Vehicle Damage:</strong> ${formData.vehicleDamage || 'N/A'}</li>
  <li><strong>Need Help:</strong> ${formData.needHelp || 'N/A'}</li>
  <li><strong>Other Vehicle Type:</strong> ${formData.otherVehicleType || 'N/A'}</li>
</ul>

<h3>SECTION 3: NECK PAIN</h3>
<ul>
  <li><strong>Neck Pain:</strong> ${formData.neckPain || 'N/A'}</li>
  <li><strong>Neck Side:</strong> ${formData.neckSide || 'N/A'}</li>
  <li><strong>Pain Start:</strong> ${formData.neckPainStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.neckInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.neckCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.neckResolvedDays || 'N/A'}</li>
</ul>

<h3>SECTION 4: SHOULDER PAIN</h3>
<ul>
  <li><strong>Shoulder Pain:</strong> ${formData.shoulderPain || 'N/A'}</li>
  <li><strong>Shoulder Side:</strong> ${formData.shoulderSide || 'N/A'}</li>
  <li><strong>Pain Start:</strong> ${formData.shoulderPainStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.shoulderInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.shoulderCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.shoulderResolvedDays || 'N/A'}</li>
</ul>

<h3>SECTION 5: BACK PAIN</h3>
<ul>
  <li><strong>Back Pain:</strong> ${formData.backPain || 'N/A'}</li>
  <li><strong>Back Location:</strong> ${formData.backLocation || 'N/A'}</li>
  <li><strong>Pain Start:</strong> ${formData.backPainStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.backInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.backCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.backResolvedDays || 'N/A'}</li>
</ul>

<h3>SECTION 6: HEADACHE</h3>
<ul>
  <li><strong>Headache:</strong> ${formData.headache || 'N/A'}</li>
  <li><strong>Headache Start:</strong> ${formData.headacheStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.headacheInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.headacheCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.headacheResolvedDays || 'N/A'}</li>
  <li><strong>Medical History:</strong> ${formData.headacheMedicalHistory || 'N/A'}</li>
</ul>

<h3>SECTION 7: TRAVEL ANXIETY</h3>
<ul>
  <li><strong>Travel Anxiety:</strong> ${formData.travelAnxiety || 'N/A'}</li>
  <li><strong>Back to Driving:</strong> ${formData.backToDriving || 'N/A'}</li>
  <li><strong>Cautious Driver:</strong> ${formData.cautiousDriver || 'N/A'}</li>
  <li><strong>Looking Rear Mirror:</strong> ${formData.lookingRearMirror || 'N/A'}</li>
  <li><strong>Prevented Driving:</strong> ${formData.preventedDriving || 'N/A'}</li>
  <li><strong>Anxiety Start:</strong> ${formData.anxietyStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.anxietyInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.anxietyCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.anxietyResolvedDays || 'N/A'}</li>
  <li><strong>Medical History:</strong> ${formData.anxietyMedicalHistory || 'N/A'}</li>
</ul>

<h3>SECTION 8: BRUISING/SCARRING</h3>
<ul>
  <li><strong>Bruising:</strong> ${formData.bruising || 'N/A'}</li>
  <li><strong>Bruising Location:</strong> ${formData.bruisingLocation || 'N/A'}</li>
  <li><strong>When Noticed:</strong> ${formData.bruisingNoticed || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.bruisingInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.bruisingCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.bruisingResolvedDays || 'N/A'}</li>
  <li><strong>Visible Scar:</strong> ${formData.visibleScar || 'N/A'}</li>
</ul>

<h3>SECTION 9: OTHER INJURIES</h3>
<ul>
  <li><strong>Other Injury:</strong> ${formData.otherInjury || 'N/A'}</li>
  <li><strong>Injury Name:</strong> ${formData.injuryName || 'N/A'}</li>
  <li><strong>Injury Start:</strong> ${formData.injuryStart || 'N/A'}</li>
  <li><strong>Initial Severity:</strong> ${formData.injuryInitialSeverity || 'N/A'}</li>
  <li><strong>Current Severity:</strong> ${formData.injuryCurrentSeverity || 'N/A'}</li>
  <li><strong>Resolved Days:</strong> ${formData.injuryResolvedDays || 'N/A'}</li>
</ul>

<h3>SECTION 10: TREATMENT</h3>
<ul>
  <li><strong>Treatment at Scene:</strong> ${formData.treatmentAtScene || 'N/A'}</li>
  <li><strong>Treatment Details:</strong> ${formData.treatmentDetails || 'N/A'}</li>
  <li><strong>Went to A&E:</strong> ${formData.wentToAE || 'N/A'}</li>
  <li><strong>Hospital Name:</strong> ${formData.hospitalName || 'N/A'}</li>
  <li><strong>Hospital Treatment:</strong> ${formData.hospitalTreatment || 'N/A'}</li>
  <li><strong>Went to GP:</strong> ${formData.wentToGP || 'N/A'}</li>
  <li><strong>GP Days After:</strong> ${formData.gpDaysAfter || 'N/A'}</li>
  <li><strong>Current Treatment:</strong> ${formData.currentTreatment || 'N/A'}</li>
  <li><strong>Physiotherapy Sessions:</strong> ${formData.physiotherapySessions || 'N/A'}</li>
</ul>

<h3>SECTION 11: IMPACT ON LIFE</h3>
<ul>
  <li><strong>Days Off Work:</strong> ${formData.daysOffWork || 'N/A'}</li>
  <li><strong>Light Duty Days:</strong> ${formData.lightDutyDays || 'N/A'}</li>
  <li><strong>Work Difficulties:</strong> ${formData.workDifficulties || 'N/A'}</li>
  <li><strong>Sleep Disturbance:</strong> ${formData.sleepDisturbance || 'N/A'}</li>
  <li><strong>Sleep Details:</strong> ${formData.sleepDisturbanceDetails || 'N/A'}</li>
  <li><strong>Domestic Effect:</strong> ${formData.domesticEffect || 'N/A'}</li>
  <li><strong>Domestic Details:</strong> ${formData.domesticEffectDetails || 'N/A'}</li>
  <li><strong>Sport/Leisure Effect:</strong> ${formData.sportLeisureEffect || 'N/A'}</li>
  <li><strong>Sport/Leisure Details:</strong> ${formData.sportLeisureEffectDetails || 'N/A'}</li>
  <li><strong>Social Life Effect:</strong> ${formData.socialLifeEffect || 'N/A'}</li>
  <li><strong>Social Life Details:</strong> ${formData.socialLifeEffectDetails || 'N/A'}</li>
</ul>

<h3>SECTION 12: PREVIOUS HISTORY</h3>
<ul>
  <li><strong>Previous Accident:</strong> ${formData.previousAccident || 'N/A'}</li>
  <li><strong>Previous Accident Date:</strong> ${formData.previousAccidentDate || 'N/A'}</li>
  <li><strong>Recovered Completely:</strong> ${formData.recoveredCompletely || 'N/A'}</li>
  <li><strong>Made Worse:</strong> ${formData.madeWorse || 'N/A'}</li>
  <li><strong>Previous Conditions:</strong> ${formData.previousConditions || 'N/A'}</li>
  <li><strong>Anything Else:</strong> ${formData.anythingElse || 'N/A'}</li>
  <li><strong>Anything Else Details:</strong> ${formData.anythingElseDetails || 'N/A'}</li>
</ul>

<p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
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
