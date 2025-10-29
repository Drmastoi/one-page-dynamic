import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuestionnaireForm from './QuestionnaireForm';
import AdditionalSections from './AdditionalSections';

interface QuestionnaireFormData {
  [key: string]: string;
}

const TOTAL_STEPS = 9;

const stepTitles = [
  'Personal Information',
  'Accident Details',
  'Neck Pain Assessment',
  'Shoulder Pain Assessment',
  'Back Pain Assessment',
  'Headache Assessment',
  'Travel Anxiety Assessment',
  'Bruising/Scarring Assessment',
  'Other Injuries Assessment'
];

export default function MultiStepQuestionnaireForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-questionnaire`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      toast({
        title: "Success!",
        description: "Your questionnaire has been submitted successfully. You will receive a confirmation email shortly.",
      });

      // Reset form
      setFormData({});
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your questionnaire. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const renderCurrentSection = () => {
    const sectionId = `section-${currentStep}`;
    
    // Sections 1-7 are in QuestionnaireForm
    // Sections 8-9 are in AdditionalSections
    if (currentStep >= 1 && currentStep <= 7) {
      return (
        <QuestionnaireForm 
          formData={formData}
          handleInputChange={handleInputChange}
          sectionFilter={sectionId}
        />
      );
    } else if (currentStep >= 8 && currentStep <= 9) {
      return (
        <AdditionalSections 
          formData={formData}
          handleInputChange={handleInputChange}
          sectionFilter={sectionId}
        />
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 pt-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-primary">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-muted-foreground">
              {stepTitles[currentStep - 1]}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Current Section */}
      {renderCurrentSection()}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={nextStep}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
          </Button>
        )}
      </div>
    </form>
  );
}
