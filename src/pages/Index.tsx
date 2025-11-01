import { useState } from 'react';
import MultiStepQuestionnaireForm from '@/components/MultiStepQuestionnaireForm';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
        {/* Background pattern for glass effect visibility */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-400 rounded-full blur-xl"></div>
        </div>

        <AppSidebar currentStep={currentStep} onStepChange={setCurrentStep} />

        <main className="flex-1 relative z-10 overflow-x-hidden">
          {/* Header with sidebar trigger */}
          <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-3 py-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg md:text-xl font-semibold text-primary">
                Personal Injury Questionnaire
              </h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <Alert className="mb-4">
              <AlertDescription className="text-xs">
                <strong>Note:</strong> Fields marked <span className="text-destructive">*</span> are required. Complete accurately for proper assessment.
              </AlertDescription>
            </Alert>

            <MultiStepQuestionnaireForm currentStep={currentStep} setCurrentStep={setCurrentStep} />

            <footer className="text-center mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Confidential & Secure Submission
              </p>
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;