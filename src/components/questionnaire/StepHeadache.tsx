import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';
import { Separator } from '@/components/ui/separator';

interface StepHeadacheProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepHeadache = ({ formData, handleInputChange }: StepHeadacheProps) => {
  return (
    <div className="space-y-8">
      {/* Headache Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Headache Assessment</h3>
        
        <FormField label="Did you get any headache?" field="headache" required>
          <RadioGroup value={formData.headache || ''} onValueChange={(value) => handleInputChange('headache', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="headache-yes" />
              <Label htmlFor="headache-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="headache-no" />
              <Label htmlFor="headache-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>

        {formData.headache === 'yes' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="When did this pain start?" field="headacheStart">
                <Select value={formData.headacheStart || ''} onValueChange={(value) => handleInputChange('headacheStart', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select when" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="next-day">Next Day</SelectItem>
                    <SelectItem value="few-days-later">Few Days Later</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Initial severity of pain" field="headacheInitialSeverity">
                <Select value={formData.headacheInitialSeverity || ''} onValueChange={(value) => handleInputChange('headacheInitialSeverity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Current severity of pain" field="headacheCurrentSeverity">
                <Select value={formData.headacheCurrentSeverity || ''} onValueChange={(value) => handleInputChange('headacheCurrentSeverity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              {formData.headacheCurrentSeverity === 'resolved' && (
                <FormField label="If resolved, how many days did it take?" field="headacheResolvedDays">
                  <Input
                    type="number"
                    min="0"
                    value={formData.headacheResolvedDays || ''}
                    onChange={(e) => handleInputChange('headacheResolvedDays', e.target.value)}
                    placeholder="Enter number of days"
                  />
                </FormField>
              )}
            </div>

            <FormField label="Past medical history of headache before the accident" field="headacheMedicalHistory">
              <Textarea
                value={formData.headacheMedicalHistory || ''}
                onChange={(e) => handleInputChange('headacheMedicalHistory', e.target.value)}
                placeholder="Please describe any previous headache history"
                rows={3}
              />
            </FormField>
          </>
        )}
      </div>

      <Separator />

      {/* Travel Anxiety Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Travel Anxiety Assessment</h3>
        
        <FormField label="Did you experience travel anxiety, fear of travelling after the accident?" field="travelAnxiety" required>
          <RadioGroup value={formData.travelAnxiety || ''} onValueChange={(value) => handleInputChange('travelAnxiety', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="travel-anxiety-yes" />
              <Label htmlFor="travel-anxiety-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="travel-anxiety-no" />
              <Label htmlFor="travel-anxiety-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Are you back to driving currently?" field="backToDriving">
            <RadioGroup value={formData.backToDriving || ''} onValueChange={(value) => handleInputChange('backToDriving', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="back-driving-yes" />
                <Label htmlFor="back-driving-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="back-driving-no" />
                <Label htmlFor="back-driving-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Are you more cautious driver after the accident?" field="cautiousDriver">
            <RadioGroup value={formData.cautiousDriver || ''} onValueChange={(value) => handleInputChange('cautiousDriver', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="cautious-yes" />
                <Label htmlFor="cautious-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="cautious-no" />
                <Label htmlFor="cautious-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Do you keep looking in the rear mirror or over the shoulders and worry of being hit again?" field="lookingRearMirror">
            <RadioGroup value={formData.lookingRearMirror || ''} onValueChange={(value) => handleInputChange('lookingRearMirror', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="rear-mirror-yes" />
                <Label htmlFor="rear-mirror-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="rear-mirror-no" />
                <Label htmlFor="rear-mirror-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Has it prevented you from driving for leisure and work?" field="preventedDriving">
            <RadioGroup value={formData.preventedDriving || ''} onValueChange={(value) => handleInputChange('preventedDriving', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="prevented-yes" />
                <Label htmlFor="prevented-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="prevented-no" />
                <Label htmlFor="prevented-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>
        </div>

        {formData.travelAnxiety === 'yes' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="When your travel anxiety started" field="anxietyStart">
                <Select value={formData.anxietyStart || ''} onValueChange={(value) => handleInputChange('anxietyStart', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select when" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="next-day">Next Day</SelectItem>
                    <SelectItem value="few-days-later">Few Days Later</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Initial severity of travel anxiety" field="anxietyInitialSeverity">
                <Select value={formData.anxietyInitialSeverity || ''} onValueChange={(value) => handleInputChange('anxietyInitialSeverity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Current severity of travel anxiety" field="anxietyCurrentSeverity">
                <Select value={formData.anxietyCurrentSeverity || ''} onValueChange={(value) => handleInputChange('anxietyCurrentSeverity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              {formData.anxietyCurrentSeverity === 'resolved' && (
                <FormField label="If resolved, how many days did it take?" field="anxietyResolvedDays">
                  <Input
                    type="number"
                    min="0"
                    value={formData.anxietyResolvedDays || ''}
                    onChange={(e) => handleInputChange('anxietyResolvedDays', e.target.value)}
                    placeholder="Enter number of days"
                  />
                </FormField>
              )}
            </div>

            <FormField label="Past medical history of anxiety before the accident" field="anxietyMedicalHistory">
              <Textarea
                value={formData.anxietyMedicalHistory || ''}
                onChange={(e) => handleInputChange('anxietyMedicalHistory', e.target.value)}
                placeholder="Please describe any previous anxiety history"
                rows={3}
              />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
};
