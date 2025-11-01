import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export const ProgressIndicator = ({ currentStep, totalSteps, stepTitle }: ProgressIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base sm:text-lg font-semibold text-primary">{stepTitle}</h2>
        <span className="text-xs text-muted-foreground font-medium">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
};
