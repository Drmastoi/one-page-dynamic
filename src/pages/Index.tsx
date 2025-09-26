import QuestionnaireForm from '@/components/QuestionnaireForm';
import NavigationMenu from '@/components/NavigationMenu';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Personal Injury Questionnaire
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please complete all sections of this questionnaire accurately. Your responses will help us understand the full impact of your accident and injuries.
          </p>
          <div className="mt-6 p-4 bg-accent/50 rounded-lg border border-accent">
            <p className="text-sm text-accent-foreground">
              <strong>Note:</strong> All fields marked with <span className="text-form-required">*</span> are required. 
              Please ensure all information is accurate and complete before submission.
            </p>
          </div>
        </header>

        <QuestionnaireForm />

        <footer className="text-center mt-16 py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            This questionnaire is confidential and will be submitted securely to our medical assessment team.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;