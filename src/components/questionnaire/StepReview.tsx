import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

interface StepReviewProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepReview = ({ formData, handleInputChange }: StepReviewProps) => {
  return (
    <div className="space-y-6">
      {/* Treatment Section */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-primary">Treatment Details</h3>
        
        <FormField label="Did you receive any treatment at the scene of accident?" field="treatmentAtScene" required>
          <RadioGroup value={formData.treatmentAtScene || ''} onValueChange={(value) => handleInputChange('treatmentAtScene', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="treatment-scene-yes" />
              <Label htmlFor="treatment-scene-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="treatment-scene-no" />
              <Label htmlFor="treatment-scene-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>

        {formData.treatmentAtScene === 'yes' && (
          <FormField label="What treatment did you receive?" field="treatmentDetails">
            <Textarea
              value={formData.treatmentDetails || ''}
              onChange={(e) => handleInputChange('treatmentDetails', e.target.value)}
              placeholder="Describe the treatment received at the scene"
              rows={3}
            />
          </FormField>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Did you go to A&E after accident?" field="wentToAE" required>
            <RadioGroup value={formData.wentToAE || ''} onValueChange={(value) => handleInputChange('wentToAE', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="went-ae-yes" />
                <Label htmlFor="went-ae-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="went-ae-no" />
                <Label htmlFor="went-ae-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.wentToAE === 'yes' && (
            <FormField label="Which hospital A&E did you go to?" field="hospitalName">
              <Input
                value={formData.hospitalName || ''}
                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                placeholder="Enter hospital name"
              />
            </FormField>
          )}
        </div>

        {formData.wentToAE === 'yes' && (
          <FormField label="What treatment did you receive at the hospital?" field="hospitalTreatment">
            <Select value={formData.hospitalTreatment || ''} onValueChange={(value) => handleInputChange('hospitalTreatment', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="xray">X-ray</SelectItem>
                <SelectItem value="ct-scan">CT Scan</SelectItem>
                <SelectItem value="bandage">Bandage</SelectItem>
                <SelectItem value="neck-collar">Neck Collar</SelectItem>
                <SelectItem value="multiple">Multiple treatments</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Did you go to Walk-in centre / GP after accident?" field="wentToGP" required>
            <RadioGroup value={formData.wentToGP || ''} onValueChange={(value) => handleInputChange('wentToGP', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="went-gp-yes" />
                <Label htmlFor="went-gp-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="went-gp-no" />
                <Label htmlFor="went-gp-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.wentToGP === 'yes' && (
            <FormField label="How many days after the accident did you consult Walk-in centre / GP?" field="gpDaysAfter">
              <Input
                type="number"
                min="0"
                value={formData.gpDaysAfter || ''}
                onChange={(e) => handleInputChange('gpDaysAfter', e.target.value)}
                placeholder="Enter number of days"
              />
            </FormField>
          )}
        </div>

        <FormField label="What is your current treatment?" field="currentTreatment">
          <Select value={formData.currentTreatment || ''} onValueChange={(value) => handleInputChange('currentTreatment', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select current treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paracetamol">Paracetamol</SelectItem>
              <SelectItem value="ibuprofen-naproxen">Ibuprofen / Naproxen</SelectItem>
              <SelectItem value="codeine">Codeine</SelectItem>
              <SelectItem value="other-prescribed">Other prescribed medicines</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="How many sessions of physiotherapy have you had so far?" field="physiotherapySessions">
          <Input
            type="number"
            min="0"
            value={formData.physiotherapySessions || ''}
            onChange={(e) => handleInputChange('physiotherapySessions', e.target.value)}
            placeholder="Enter number of sessions"
          />
        </FormField>
      </div>

      <Separator className="my-4" />

      {/* Impact on Life Section */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-primary">Impact on Life</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField label="How many days did you take off work because of the accident?" field="daysOffWork" required>
            <Input
              type="number"
              min="0"
              value={formData.daysOffWork || ''}
              onChange={(e) => handleInputChange('daysOffWork', e.target.value)}
              placeholder="Enter number of days"
            />
          </FormField>

          <FormField label="How many days of light duties or reduced hours did you take?" field="lightDutyDays">
            <Input
              type="number"
              min="0"
              value={formData.lightDutyDays || ''}
              onChange={(e) => handleInputChange('lightDutyDays', e.target.value)}
              placeholder="Enter number of days"
            />
          </FormField>
        </div>

        <FormField label="What are the things that are hard to do at work?" field="workDifficulties">
          <Textarea
            value={formData.workDifficulties || ''}
            onChange={(e) => handleInputChange('workDifficulties', e.target.value)}
            placeholder="e.g., standing, sitting for longer periods, etc."
            rows={3}
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Do you have sleep disturbance?" field="sleepDisturbance" required>
            <RadioGroup value={formData.sleepDisturbance || ''} onValueChange={(value) => handleInputChange('sleepDisturbance', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="sleep-yes" />
                <Label htmlFor="sleep-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="sleep-no" />
                <Label htmlFor="sleep-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.sleepDisturbance === 'yes' && (
            <FormField label="Sleep disturbance details" field="sleepDisturbanceDetails">
              <Textarea
                value={formData.sleepDisturbanceDetails || ''}
                onChange={(e) => handleInputChange('sleepDisturbanceDetails', e.target.value)}
                placeholder="Describe your sleep difficulties"
                rows={2}
              />
            </FormField>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Do you have effect on domestic living?" field="domesticEffect" required>
            <RadioGroup value={formData.domesticEffect || ''} onValueChange={(value) => handleInputChange('domesticEffect', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="domestic-yes" />
                <Label htmlFor="domestic-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="domestic-no" />
                <Label htmlFor="domestic-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.domesticEffect === 'yes' && (
            <FormField label="Domestic effect details" field="domesticEffectDetails">
              <Textarea
                value={formData.domesticEffectDetails || ''}
                onChange={(e) => handleInputChange('domesticEffectDetails', e.target.value)}
                placeholder="Describe effects on domestic activities"
                rows={2}
              />
            </FormField>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Do you have effect on sport & leisure activity?" field="sportLeisureEffect" required>
            <RadioGroup value={formData.sportLeisureEffect || ''} onValueChange={(value) => handleInputChange('sportLeisureEffect', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="sport-yes" />
                <Label htmlFor="sport-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="sport-no" />
                <Label htmlFor="sport-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.sportLeisureEffect === 'yes' && (
            <FormField label="Sport & leisure effect details" field="sportLeisureEffectDetails">
              <Textarea
                value={formData.sportLeisureEffectDetails || ''}
                onChange={(e) => handleInputChange('sportLeisureEffectDetails', e.target.value)}
                placeholder="Describe effects on sport and leisure activities"
                rows={2}
              />
            </FormField>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Do you have effect on social life?" field="socialLifeEffect" required>
            <RadioGroup value={formData.socialLifeEffect || ''} onValueChange={(value) => handleInputChange('socialLifeEffect', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="social-yes" />
                <Label htmlFor="social-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="social-no" />
                <Label htmlFor="social-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.socialLifeEffect === 'yes' && (
            <FormField label="Social life effect details" field="socialLifeEffectDetails">
              <Textarea
                value={formData.socialLifeEffectDetails || ''}
                onChange={(e) => handleInputChange('socialLifeEffectDetails', e.target.value)}
                placeholder="Describe effects on social life"
                rows={2}
              />
            </FormField>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Previous Medical History Section */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-primary">Previous Medical History</h3>
        
        <FormField label="Did you have previous road traffic accident?" field="previousAccident" required>
          <RadioGroup value={formData.previousAccident || ''} onValueChange={(value) => handleInputChange('previousAccident', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="previous-accident-yes" />
              <Label htmlFor="previous-accident-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="previous-accident-no" />
              <Label htmlFor="previous-accident-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>

        {formData.previousAccident === 'yes' && (
          <>
            <FormField label="When was it?" field="previousAccidentDate">
              <Input
                type="date"
                value={formData.previousAccidentDate || ''}
                onChange={(e) => handleInputChange('previousAccidentDate', e.target.value)}
              />
            </FormField>

            <FormField label="Did you recover completely from previous accident?" field="recoveredCompletely">
              <RadioGroup value={formData.recoveredCompletely || ''} onValueChange={(value) => handleInputChange('recoveredCompletely', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="recovered-yes" />
                  <Label htmlFor="recovered-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="recovered-no" />
                  <Label htmlFor="recovered-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Has this accident made previous injuries worse?" field="madeWorse">
              <RadioGroup value={formData.madeWorse || ''} onValueChange={(value) => handleInputChange('madeWorse', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="made-worse-yes" />
                  <Label htmlFor="made-worse-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="made-worse-no" />
                  <Label htmlFor="made-worse-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </>
        )}

        <FormField label="Do you have any previous medical condition which is worse because of this accident?" field="previousConditions">
          <Textarea
            value={formData.previousConditions || ''}
            onChange={(e) => handleInputChange('previousConditions', e.target.value)}
            placeholder="Please provide details if yes"
            rows={3}
          />
        </FormField>

        <FormField label="Is there anything else you want to add?" field="anythingElse" required>
          <Select value={formData.anythingElse || ''} onValueChange={(value) => handleInputChange('anythingElse', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {formData.anythingElse === 'yes' && (
          <FormField label="Additional details" field="anythingElseDetails">
            <Textarea
              value={formData.anythingElseDetails || ''}
              onChange={(e) => handleInputChange('anythingElseDetails', e.target.value)}
              placeholder="Please provide any additional information you think is important"
              rows={4}
            />
          </FormField>
        )}
      </div>

      <Separator />

      {/* Summary Notice */}
      <Card className="p-6 bg-accent/30 border-accent">
        <h3 className="text-lg font-semibold text-primary mb-3">Ready to Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please review all sections carefully before submitting. You can use the "Previous" button to go back and edit any information if needed.
        </p>
      </Card>
    </div>
  );
};
