import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { questionnaireSchema } from '@/lib/validationSchema';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AccidentDetailsStep from './steps/AccidentDetailsStep';
import VehicleInfoStep from './steps/VehicleInfoStep';
import InjuryMedicalStep from './steps/InjuryMedicalStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';

export interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  
  // Accident Details
  accidentDate: string;
  accidentLocation: string;
  accidentDescription: string;
  policeReportFiled: string;
  policeReportNumber?: string;
  faultParty: string;
  weatherConditions?: string;
  roadConditions?: string;
  trafficConditions?: string;
  
  // Vehicle Information
  vehicleLocation: string;
  vehicleType: string;
  vehicleDamage: string;
  impactLocation: string;
  otherVehicleType: string;
  
  // Injuries and Medical
  immediatePain: string;
  currentPain: string;
  injuryDescription: string;
  medicalTreatment: string;
  hospitalName?: string;
  doctorName?: string;
  ongoingTreatment: string;
  
  // Additional Information
  whoLivesWithYou: string;
  witnesses: string;
  witnessDetails?: string;
  insuranceCompany: string;
  policyNumber?: string;
  claimFiled: string;
  
  // Files
  photos?: File[];
}

const STORAGE_KEY = 'questionnaire_draft';
const STEPS = [
  { id: 1, title: 'Personal Info', component: PersonalInfoStep },
  { id: 2, title: 'Accident Details', component: AccidentDetailsStep },
  { id: 3, title: 'Vehicle Info', component: VehicleInfoStep },
  { id: 4, title: 'Injuries & Medical', component: InjuryMedicalStep },
  { id: 5, title: 'Additional Info', component: AdditionalInfoStep },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        toast({
          title: "Draft Restored",
          description: "Your previous progress has been loaded.",
        });
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const uploadPhotos = async (photos: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('accident-photos')
        .upload(filePath, photo);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('accident-photos')
        .getPublicUrl(filePath);
      
      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate all form data before submission
      const validationResult = questionnaireSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        const firstError = errors[0];
        
        toast({
          title: "Validation Error",
          description: `${firstError.path.join('.')}: ${firstError.message}`,
          variant: "destructive",
        });
        
        // Find which step contains the error and navigate to it
        const errorField = firstError.path[0] as string;
        const fieldToStepMap: Record<string, number> = {
          fullName: 1, email: 1, phone: 1, address: 1, city: 1, state: 1, zipCode: 1, dateOfBirth: 1,
          accidentDate: 2, accidentLocation: 2, accidentDescription: 2, policeReportFiled: 2, 
          policeReportNumber: 2, faultParty: 2, weatherConditions: 2, roadConditions: 2, trafficConditions: 2,
          vehicleLocation: 3, vehicleType: 3, vehicleDamage: 3, impactLocation: 3, otherVehicleType: 3,
          immediatePain: 4, currentPain: 4, injuryDescription: 4, medicalTreatment: 4, 
          hospitalName: 4, doctorName: 4, ongoingTreatment: 4,
          whoLivesWithYou: 5, witnesses: 5, witnessDetails: 5, insuranceCompany: 5, 
          policyNumber: 5, claimFiled: 5,
        };
        
        const targetStep = fieldToStepMap[errorField] || 1;
        setCurrentStep(targetStep);
        setIsSubmitting(false);
        return;
      }

      // Upload photos if any
      let photoUrls: string[] = [];
      if (formData.photos && formData.photos.length > 0) {
        photoUrls = await uploadPhotos(formData.photos);
      }

      // Prepare submission data (exclude photos file objects)
      const { photos, ...validatedData } = validationResult.data;
      const submissionData = {
        ...validatedData,
        photoUrls,
      };

      // Call edge function to save and send emails
      const response = await supabase.functions.invoke('send-questionnaire', {
        body: submissionData,
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Success!",
        description: "Your questionnaire has been submitted. Check your email for confirmation.",
      });

      // Clear draft and reset form
      localStorage.removeItem(STORAGE_KEY);
      setFormData({});
      setCurrentStep(1);
    } catch (error: any) {
      console.error('Submission error:', error);
      
      const errorMessage = error?.message || "There was an error submitting your questionnaire. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
          </h3>
          {isSaving && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Save className="w-4 h-4 mr-1" />
              Saved
            </div>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <CurrentStepComponent 
        formData={formData} 
        updateFormData={updateFormData} 
      />

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < STEPS.length ? (
          <Button
            type="button"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
          </Button>
        )}
      </div>
    </div>
  );
}
