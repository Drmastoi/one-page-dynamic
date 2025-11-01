import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    <AccordionItem value={value} className="border border-border rounded-lg px-3 bg-card">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center gap-2 text-left w-full">
          <span className="text-xl">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{title}</h4>
            <div className="flex gap-1.5 mt-1">
              <Badge variant="outline" className={cn(getSeverityColor(currentSeverity), "text-xs px-1.5 py-0")}>
                {currentSeverity}
              </Badge>
              <Badge variant="outline" className={cn(status.color, "text-xs px-1.5 py-0")}>
                {status.text}
              </Badge>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-3">
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Initial</p>
              <Badge className={cn(getSeverityColor(initialSeverity), "text-xs")}>{initialSeverity}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current</p>
              <Badge className={cn(getSeverityColor(currentSeverity), "text-xs")}>{currentSeverity}</Badge>
            </div>
          </div>
          
          {details.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-border">
              {details.map((detail, index) => (
                <div key={index} className="flex justify-between text-xs">
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
