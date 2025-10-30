import React from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  number: number;
}

const navItems: NavItem[] = [
  { title: 'Personal Information', number: 1 },
  { title: 'Accident Details', number: 2 },
  { title: 'Neck Pain', number: 3 },
  { title: 'Shoulder Pain', number: 4 },
  { title: 'Back Pain', number: 5 },
  { title: 'Headache & Anxiety', number: 6 },
  { title: 'Bruising/Scarring', number: 7 },
  { title: 'Other Injuries', number: 8 },
  { title: 'Review & Submit', number: 9 },
];

interface NavigationMenuProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function NavigationMenu({ currentStep, onStepChange }: NavigationMenuProps) {
  const handleStepClick = (stepNumber: number) => {
    onStepChange(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-0 w-full bg-black/40 backdrop-blur-2xl shadow-xl border-b border-white/20 ring-1 ring-white/10 z-50">
      <nav className="container mx-auto px-2 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          <h3 className="text-white font-semibold text-xs mr-2 whitespace-nowrap drop-shadow-lg flex-shrink-0">
            Steps:
          </h3>
          
          {navItems.map((item) => (
            <button
              key={item.number}
              onClick={() => handleStepClick(item.number)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                currentStep === item.number
                  ? "bg-teal-500 text-white shadow-lg border border-teal-400"
                  : "text-white/85 bg-white/10 hover:bg-white/20 hover:text-white border border-white/20"
              )}
            >
              <div 
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors flex-shrink-0",
                  currentStep === item.number
                    ? "bg-white text-teal-600"
                    : "bg-white/25 text-white"
                )}
              >
                {item.number}
              </div>
              <span className="text-xs drop-shadow-sm">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}