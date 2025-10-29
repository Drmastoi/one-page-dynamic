import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProgressIndicator } from './questionnaire/ProgressIndicator';
import { StepPersonalInfo } from './questionnaire/StepPersonalInfo';
import { StepAccidentDetails } from './questionnaire/StepAccidentDetails';
import { StepNeckPain } from './questionnaire/StepNeckPain';
import { StepShoulderPain } from './questionnaire/StepShoulderPain';
import { StepBackPain } from './questionnaire/StepBackPain';
import { StepHeadache } from './questionnaire/StepHeadache';
import { StepBruising } from './questionnaire/StepBruising';
import { StepOtherInjuries } from './questionnaire/StepOtherInjuries';
import { StepReview } from './questionnaire/StepReview';

interface QuestionnaireFormData {
  [key: string]: string;
}

const TOTAL_STEPS = 9;

const STEP_TITLES = [
  'Personal Information',
  'Accident Details',
  'Neck Pain Assessment',
  'Shoulder Pain Assessment',
  'Back Pain Assessment',
  'Head/Headache & Travel Anxiety Assessment',
  'Bruising/Scarring Assessment',
  'Other Injuries Assessment',
  'Review & Submit'
];

export default function MultiStepQuestionnaireForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
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

  const renderStep = () => {
    const stepProps = { formData, handleInputChange };
    
    switch (currentStep) {
      case 1:
        return <StepPersonalInfo {...stepProps} />;
      case 2:
        return <StepAccidentDetails {...stepProps} />;
      case 3:
        return <StepNeckPain {...stepProps} />;
      case 4:
        return <StepShoulderPain {...stepProps} />;
      case 5:
        return <StepBackPain {...stepProps} />;
      case 6:
        return <StepHeadache {...stepProps} />;
      case 7:
        return <StepBruising {...stepProps} />;
      case 8:
        return <StepOtherInjuries {...stepProps} />;
      case 9:
        return <StepReview {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 sm:p-8 bg-form-section border-form-section-border">
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          stepTitle={STEP_TITLES[currentStep - 1]} 
        />

        <div className="animate-fade-in">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6"
          >
            ← Previous
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleNext}
              className="px-6"
            >
              Next →
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
}
