import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
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
import jsPDF from 'jspdf';

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

interface MultiStepQuestionnaireFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function MultiStepQuestionnaireForm({ 
  currentStep, 
  setCurrentStep 
}: MultiStepQuestionnaireFormProps) {
  const [formData, setFormData] = useState<QuestionnaireFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const { toast } = useToast();

  const STORAGE_KEY = 'questionnaire_draft';
  const STORAGE_STEP_KEY = 'questionnaire_step';

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
    
    if (savedData) {
      setShowResumeDialog(true);
    }
  }, []);

  // Auto-save on form data changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
    }
  }, [formData, currentStep]);

  const handleResumeYes = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
      if (savedStep) {
        setCurrentStep(parseInt(savedStep));
      }
    }
    setShowResumeDialog(false);
    toast({
      title: "Draft Restored",
      description: "Your previous progress has been restored.",
    });
  };

  const handleResumeNo = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STEP_KEY);
    setShowResumeDialog(false);
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progress Saved",
      description: "Your progress has been saved. You can continue later.",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    
    const addText = (text: string, indent: number = 0) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(text, 20 + indent, yPosition);
      yPosition += lineHeight;
    };

    doc.setFontSize(16);
    addText('Personal Injury Questionnaire Submission');
    yPosition += 5;
    
    doc.setFontSize(10);
    
    // Personal Information
    doc.setFontSize(12);
    addText('Personal Information');
    doc.setFontSize(10);
    addText(`Name: ${formData.fullName || 'N/A'}`, 5);
    addText(`Date of Birth: ${formData.dateOfBirth || 'N/A'}`, 5);
    addText(`Email: ${formData.emailAddress || 'N/A'}`, 5);
    addText(`Address: ${formData.fullAddress || 'N/A'}`, 5);
    addText(`Occupation: ${formData.occupation || 'N/A'}`, 5);
    yPosition += 3;
    
    // Accident Details
    doc.setFontSize(12);
    addText('Accident Details');
    doc.setFontSize(10);
    addText(`Date: ${formData.accidentDate || 'N/A'}`, 5);
    addText(`Time: ${formData.accidentTime || 'N/A'}`, 5);
    addText(`Location: ${formData.accidentLocation || 'N/A'}`, 5);
    addText(`Vehicle Type: ${formData.vehicleType || 'N/A'}`, 5);
    yPosition += 3;
    
    // Injuries
    if (formData.neckPain === 'yes') {
      doc.setFontSize(12);
      addText('Neck Pain');
      doc.setFontSize(10);
      addText(`Side: ${formData.neckPainSide || 'N/A'}`, 5);
      addText(`Initial Severity: ${formData.neckPainInitialSeverity || 'N/A'}/10`, 5);
      addText(`Current Severity: ${formData.neckPainCurrentSeverity || 'N/A'}/10`, 5);
      yPosition += 3;
    }
    
    if (formData.shoulderPain === 'yes') {
      doc.setFontSize(12);
      addText('Shoulder Pain');
      doc.setFontSize(10);
      addText(`Side: ${formData.shoulderPainSide || 'N/A'}`, 5);
      addText(`Initial Severity: ${formData.shoulderPainInitialSeverity || 'N/A'}/10`, 5);
      addText(`Current Severity: ${formData.shoulderPainCurrentSeverity || 'N/A'}/10`, 5);
      yPosition += 3;
    }
    
    if (formData.backPain === 'yes') {
      doc.setFontSize(12);
      addText('Back Pain');
      doc.setFontSize(10);
      addText(`Location: ${formData.backPainLocation || 'N/A'}`, 5);
      addText(`Initial Severity: ${formData.backPainInitialSeverity || 'N/A'}/10`, 5);
      addText(`Current Severity: ${formData.backPainCurrentSeverity || 'N/A'}/10`, 5);
      yPosition += 3;
    }
    
    if (formData.headache === 'yes') {
      doc.setFontSize(12);
      addText('Headache');
      doc.setFontSize(10);
      addText(`Initial Severity: ${formData.headacheInitialSeverity || 'N/A'}/10`, 5);
      addText(`Current Severity: ${formData.headacheCurrentSeverity || 'N/A'}/10`, 5);
      yPosition += 3;
    }
    
    if (formData.travelAnxiety === 'yes') {
      doc.setFontSize(12);
      addText('Travel Anxiety');
      doc.setFontSize(10);
      addText(`Initial Severity: ${formData.travelAnxietyInitialSeverity || 'N/A'}/10`, 5);
      addText(`Current Severity: ${formData.travelAnxietyCurrentSeverity || 'N/A'}/10`, 5);
      yPosition += 3;
    }
    
    // Treatment
    if (formData.attendedAE === 'yes' || formData.admittedHospital === 'yes' || formData.visitedGP === 'yes') {
      doc.setFontSize(12);
      addText('Treatment Received');
      doc.setFontSize(10);
      if (formData.attendedAE === 'yes') addText('- Attended A&E', 5);
      if (formData.admittedHospital === 'yes') addText('- Hospital Admission', 5);
      if (formData.visitedGP === 'yes') addText('- Visited GP', 5);
      if (formData.receivedPhysiotherapy === 'yes') addText('- Physiotherapy', 5);
      if (formData.receivedOsteopathy === 'yes') addText('- Osteopathy', 5);
      if (formData.receivedChiropractic === 'yes') addText('- Chiropractic', 5);
      yPosition += 3;
    }
    
    doc.save('questionnaire-submission.pdf');
  };

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

      // Clear saved data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
      
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
    <>
      <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resume Previous Session?</AlertDialogTitle>
            <AlertDialogDescription>
              We found a saved draft of your questionnaire. Would you like to continue where you left off?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleResumeNo}>Start Fresh</AlertDialogCancel>
            <AlertDialogAction onClick={handleResumeYes}>Resume</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

          {currentStep === TOTAL_STEPS && Object.keys(formData).length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={generatePDF}
                className="w-full sm:w-auto"
              >
                📄 Download PDF Copy
              </Button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-border">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6"
              >
                ← Previous
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveAndExit}
                className="px-4"
              >
                💾 Save & Exit
              </Button>
            </div>

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
    </>
  );
}
