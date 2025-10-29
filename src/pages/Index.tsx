import MultiStepForm from '@/components/MultiStepForm';
import NavigationMenu from '@/components/NavigationMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background pattern for glass effect visibility */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-400 rounded-full blur-xl"></div>
      </div>
      <NavigationMenu />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
            Personal Injury Questionnaire
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Please complete all sections of this questionnaire accurately. Your responses will help us understand the full impact of your accident and injuries.
          </p>
          <div className="mt-6 p-3 sm:p-4 bg-accent/50 rounded-lg border border-accent">
            <p className="text-sm text-accent-foreground">
              <strong>Note:</strong> All fields marked with <span className="text-form-required">*</span> are required. 
              Please ensure all information is accurate and complete before submission.
            </p>
          </div>
        </header>

        <MultiStepForm />

        <footer className="text-center mt-12 sm:mt-16 py-6 sm:py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            This questionnaire is confidential and will be submitted securely to our medical assessment team.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;