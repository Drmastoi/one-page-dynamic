import React from 'react';
import { Card } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { InjuryCard } from './InjuryCard';

interface StepPreviewSubmitProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepPreviewSubmit = ({ formData }: StepPreviewSubmitProps) => {
  // Count total injuries reported
  const injuries = [
    formData.neckPain === 'yes',
    formData.shoulderPain === 'yes',
    formData.backPain === 'yes',
    formData.headache === 'yes',
    formData.travelAnxiety === 'yes',
    formData.bruising === 'yes',
    formData.otherInjury === 'yes',
  ].filter(Boolean).length;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Summary */}
      <Card className="p-5 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          📋 Quick Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>{' '}
            <span className="font-medium">{formData.fullName || 'N/A'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Accident Date:</span>{' '}
            <span className="font-medium">{formatDate(formData.accidentDate)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Location:</span>{' '}
            <span className="font-medium">{formData.accidentLocation || 'N/A'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Injuries:</span>{' '}
            <Badge variant="secondary" className="ml-1">{injuries}</Badge>
          </div>
        </div>
      </Card>

      {/* Injuries Summary */}
      {injuries > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">Your Reported Injuries</h3>
            <p className="text-sm text-muted-foreground">
              Review the details of each injury. Click on any injury to see more information.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {formData.neckPain === 'yes' && (
              <InjuryCard
                value="neck"
                title="Neck Pain"
                icon="🦴"
                initialSeverity={formData.neckInitialSeverity || 'N/A'}
                currentSeverity={formData.neckCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Side Affected', value: formData.neckSide || 'N/A' },
                  { label: 'Started', value: formData.neckPainStart || 'N/A' },
                  ...(formData.neckCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.neckResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}

            {formData.shoulderPain === 'yes' && (
              <InjuryCard
                value="shoulder"
                title="Shoulder Pain"
                icon="💪"
                initialSeverity={formData.shoulderInitialSeverity || 'N/A'}
                currentSeverity={formData.shoulderCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Side Affected', value: formData.shoulderSide || 'N/A' },
                  { label: 'Started', value: formData.shoulderPainStart || 'N/A' },
                  ...(formData.shoulderCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.shoulderResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}

            {formData.backPain === 'yes' && (
              <InjuryCard
                value="back"
                title="Back Pain"
                icon="🔙"
                initialSeverity={formData.backInitialSeverity || 'N/A'}
                currentSeverity={formData.backCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Location', value: formData.backLocation || 'N/A' },
                  { label: 'Started', value: formData.backPainStart || 'N/A' },
                  ...(formData.backCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.backResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}

            {formData.headache === 'yes' && (
              <InjuryCard
                value="headache"
                title="Headache"
                icon="🤕"
                initialSeverity={formData.headacheInitialSeverity || 'N/A'}
                currentSeverity={formData.headacheCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Started', value: formData.headacheStart || 'N/A' },
                  ...(formData.headacheCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.headacheResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }]),
                  ...(formData.headacheMedicalHistory 
                    ? [{ label: 'Medical History', value: 'Yes' }] 
                    : [])
                ]}
              />
            )}

            {formData.travelAnxiety === 'yes' && (
              <InjuryCard
                value="anxiety"
                title="Travel Anxiety"
                icon="😰"
                initialSeverity={formData.anxietyInitialSeverity || 'N/A'}
                currentSeverity={formData.anxietyCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Started', value: formData.anxietyStart || 'N/A' },
                  { label: 'Back to Driving', value: formData.backToDriving || 'N/A' },
                  ...(formData.anxietyCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.anxietyResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }]),
                  ...(formData.anxietyMedicalHistory 
                    ? [{ label: 'Medical History', value: 'Yes' }] 
                    : [])
                ]}
              />
            )}

            {formData.bruising === 'yes' && (
              <InjuryCard
                value="bruising"
                title="Bruising/Scarring"
                icon="🩹"
                initialSeverity={formData.bruisingInitialSeverity || 'N/A'}
                currentSeverity={formData.bruisingCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Location', value: formData.bruisingLocation?.substring(0, 50) || 'N/A' },
                  { label: 'Noticed', value: formData.bruisingNoticed || 'N/A' },
                  ...(formData.bruisingCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.bruisingResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }]),
                  ...(formData.visibleScar 
                    ? [{ label: 'Visible Scar', value: 'Yes' }] 
                    : [])
                ]}
              />
            )}

            {formData.otherInjury === 'yes' && (
              <InjuryCard
                value="other1"
                title={formData.injuryName || 'Other Injury'}
                icon="🏥"
                initialSeverity={formData.injuryInitialSeverity || 'N/A'}
                currentSeverity={formData.injuryCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Started', value: formData.injuryStart || 'N/A' },
                  ...(formData.injuryCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.injuryResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}

            {formData.moreInjury === 'yes' && (
              <InjuryCard
                value="other2"
                title="Additional Injury (2)"
                icon="🏥"
                initialSeverity={formData.moreInjuryInitialSeverity || 'N/A'}
                currentSeverity={formData.moreInjuryCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Started', value: formData.moreInjuryStart || 'N/A' },
                  ...(formData.moreInjuryCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.moreInjuryResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}

            {formData.furtherInjury === 'yes' && (
              <InjuryCard
                value="other3"
                title="Additional Injury (3)"
                icon="🏥"
                initialSeverity={formData.furtherInjuryInitialSeverity || 'N/A'}
                currentSeverity={formData.furtherInjuryCurrentSeverity || 'N/A'}
                details={[
                  { label: 'Started', value: formData.furtherInjuryStart || 'N/A' },
                  ...(formData.furtherInjuryCurrentSeverity === 'resolved' 
                    ? [{ label: 'Days to Resolution', value: formData.furtherInjuryResolvedDays || 'N/A' }] 
                    : [{ label: 'Status', value: 'Still ongoing' }])
                ]}
              />
            )}
          </Accordion>
        </div>
      )}

      {injuries === 0 && (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No injuries reported</p>
        </Card>
      )}

      <Separator />

      {/* Treatment Summary */}
      {(formData.wentToAE === 'yes' || formData.wentToGP === 'yes' || formData.treatmentAtScene === 'yes') && (
        <Card className="p-5 bg-card">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            💊 Treatment Summary
          </h4>
          <ul className="space-y-1.5 text-sm">
            {formData.treatmentAtScene === 'yes' && <li className="flex items-center gap-2">✓ Treatment at scene</li>}
            {formData.wentToAE === 'yes' && (
              <li className="flex items-center gap-2">
                ✓ A&E Visit {formData.hospitalName && `(${formData.hospitalName})`}
              </li>
            )}
            {formData.wentToGP === 'yes' && (
              <li className="flex items-center gap-2">
                ✓ GP/Walk-in Centre {formData.gpDaysAfter && `(${formData.gpDaysAfter} days after)`}
              </li>
            )}
            {formData.physiotherapySessions && parseInt(formData.physiotherapySessions) > 0 && (
              <li className="flex items-center gap-2">
                ✓ Physiotherapy ({formData.physiotherapySessions} sessions)
              </li>
            )}
            {formData.currentTreatment && formData.currentTreatment !== 'none' && (
              <li className="flex items-center gap-2">
                ✓ Current: {formData.currentTreatment}
              </li>
            )}
          </ul>
        </Card>
      )}

      {/* Final Notice */}
      <Alert>
        <AlertDescription>
          <strong>Please review all your answers carefully.</strong> Once submitted, you'll receive a confirmation email with a copy of your questionnaire.
        </AlertDescription>
      </Alert>
    </div>
  );
};
