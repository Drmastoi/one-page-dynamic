import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';

interface StepShoulderPainProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepShoulderPain = ({ formData, handleInputChange }: StepShoulderPainProps) => {
  return (
    <div className="space-y-6">
      <FormField label="Did you get any shoulder pain?" field="shoulderPain" required>
        <RadioGroup value={formData.shoulderPain || ''} onValueChange={(value) => handleInputChange('shoulderPain', value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="shoulder-pain-yes" />
            <Label htmlFor="shoulder-pain-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="shoulder-pain-no" />
            <Label htmlFor="shoulder-pain-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </FormField>

      {formData.shoulderPain === 'yes' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField label="Which side of shoulder?" field="shoulderSide">
              <Select value={formData.shoulderSide || ''} onValueChange={(value) => handleInputChange('shoulderSide', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select side" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="When did this pain start?" field="shoulderPainStart">
              <Select value={formData.shoulderPainStart || ''} onValueChange={(value) => handleInputChange('shoulderPainStart', value)}>
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField label="Initial severity of pain" field="shoulderInitialSeverity">
              <Select value={formData.shoulderInitialSeverity || ''} onValueChange={(value) => handleInputChange('shoulderInitialSeverity', value)}>
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

            <FormField label="Current severity of pain" field="shoulderCurrentSeverity">
              <Select value={formData.shoulderCurrentSeverity || ''} onValueChange={(value) => handleInputChange('shoulderCurrentSeverity', value)}>
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
          </div>

          {formData.shoulderCurrentSeverity === 'resolved' && (
            <FormField label="If resolved, how many days did it take?" field="shoulderResolvedDays">
              <Input
                type="number"
                min="0"
                value={formData.shoulderResolvedDays || ''}
                onChange={(e) => handleInputChange('shoulderResolvedDays', e.target.value)}
                placeholder="Enter number of days"
              />
            </FormField>
          )}
        </>
      )}
    </div>
  );
};
