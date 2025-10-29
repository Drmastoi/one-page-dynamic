-- Create questionnaire submissions table
CREATE TABLE public.questionnaire_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  
  -- Accident Details
  accident_date TEXT NOT NULL,
  accident_location TEXT NOT NULL,
  accident_description TEXT NOT NULL,
  police_report_filed TEXT NOT NULL,
  police_report_number TEXT,
  fault_party TEXT NOT NULL,
  weather_conditions TEXT,
  road_conditions TEXT,
  traffic_conditions TEXT,
  
  -- Vehicle Information
  vehicle_location TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_damage TEXT NOT NULL,
  impact_location TEXT NOT NULL,
  other_vehicle_type TEXT NOT NULL,
  
  -- Injuries and Medical
  immediate_pain TEXT NOT NULL,
  current_pain TEXT NOT NULL,
  injury_description TEXT NOT NULL,
  medical_treatment TEXT NOT NULL,
  hospital_name TEXT,
  doctor_name TEXT,
  ongoing_treatment TEXT NOT NULL,
  
  -- Additional Information
  who_lives_with_you TEXT NOT NULL,
  witnesses TEXT NOT NULL,
  witness_details TEXT,
  insurance_company TEXT NOT NULL,
  policy_number TEXT,
  claim_filed TEXT NOT NULL,
  
  -- File references
  photo_urls TEXT[], -- Array of file paths in storage
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.questionnaire_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their own submission (public form)
CREATE POLICY "Anyone can insert submissions"
ON public.questionnaire_submissions
FOR INSERT
WITH CHECK (true);

-- Only allow reading your own submission by email (for future reference)
CREATE POLICY "Users can view their own submissions"
ON public.questionnaire_submissions
FOR SELECT
USING (email = current_setting('request.jwt.claim.email', true));

-- Create storage bucket for accident photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('accident-photos', 'accident-photos', true);

-- Storage policies for accident photos
CREATE POLICY "Anyone can upload accident photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'accident-photos');

CREATE POLICY "Anyone can view accident photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'accident-photos');

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_questionnaire_submissions_updated_at
BEFORE UPDATE ON public.questionnaire_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();