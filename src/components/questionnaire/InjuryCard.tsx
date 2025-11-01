import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface InjuryCardProps {
  value: string;
  title: string;
  icon: string;
  initialSeverity: string;
  currentSeverity: string;
  details: Array<{ label: string; value: string }>;
}

const getSeverityColor = (severity: string) => {
  const lowerSeverity = severity.toLowerCase();
  if (lowerSeverity === 'resolved') return 'bg-success text-success-foreground';
  if (lowerSeverity === 'mild') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
  if (lowerSeverity === 'moderate') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  if (lowerSeverity === 'severe') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  return 'bg-muted text-muted-foreground';
};

const getStatusBadge = (initial: string, current: string) => {
  const currentLower = current.toLowerCase();
  const initialLower = initial.toLowerCase();
  
  if (currentLower === 'resolved') {
    return { text: '✓ Resolved', color: 'bg-success text-success-foreground' };
  }
  
  const severityMap: { [key: string]: number } = {
    'mild': 1,
    'moderate': 2,
    'severe': 3
  };
  
  const initialNum = severityMap[initialLower] || 0;
  const currentNum = severityMap[currentLower] || 0;
  
  if (currentNum < initialNum) {
    return { text: '↓ Improving', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' };
  }
  if (currentNum > initialNum) {
    return { text: '↑ Worsening', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' };
  }
  return { text: '→ Stable', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' };
};

export const InjuryCard = ({ value, title, icon, initialSeverity, currentSeverity, details }: InjuryCardProps) => {
  const status = getStatusBadge(initialSeverity, currentSeverity);
  
  return (
    <AccordionItem value={value} className="border border-border rounded-lg px-4 bg-card">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center gap-3 text-left w-full">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-base">{title}</h4>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className={getSeverityColor(currentSeverity)}>
                Current: {currentSeverity}
              </Badge>
              <Badge variant="outline" className={status.color}>
                {status.text}
              </Badge>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Initial Severity</p>
              <Badge className={getSeverityColor(initialSeverity)}>{initialSeverity}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Severity</p>
              <Badge className={getSeverityColor(currentSeverity)}>{currentSeverity}</Badge>
            </div>
          </div>
          
          {details.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              {details.map((detail, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{detail.label}:</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
