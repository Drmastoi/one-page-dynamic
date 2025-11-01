import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';

interface StepNeckPainProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepNeckPain = ({ formData, handleInputChange }: StepNeckPainProps) => {
  return (
    <div className="space-y-4">
      <FormField label="Did you get any neck pain after the accident?" field="neckPain" required>
        <RadioGroup value={formData.neckPain || ''} onValueChange={(value) => handleInputChange('neckPain', value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="neck-pain-yes" />
            <Label htmlFor="neck-pain-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="neck-pain-no" />
            <Label htmlFor="neck-pain-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </FormField>

      {formData.neckPain === 'yes' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Which side of neck?" field="neckSide">
              <Select value={formData.neckSide || ''} onValueChange={(value) => handleInputChange('neckSide', value)}>
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

            <FormField label="When did this pain start?" field="neckPainStart">
              <Select value={formData.neckPainStart || ''} onValueChange={(value) => handleInputChange('neckPainStart', value)}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Initial severity of pain" field="neckInitialSeverity">
              <Select value={formData.neckInitialSeverity || ''} onValueChange={(value) => handleInputChange('neckInitialSeverity', value)}>
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

            <FormField label="Current severity of pain" field="neckCurrentSeverity">
              <Select value={formData.neckCurrentSeverity || ''} onValueChange={(value) => handleInputChange('neckCurrentSeverity', value)}>
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

          {formData.neckCurrentSeverity === 'resolved' && (
            <FormField label="If resolved, how many days did it take?" field="neckResolvedDays">
              <Input
                type="number"
                min="0"
                value={formData.neckResolvedDays || ''}
                onChange={(e) => handleInputChange('neckResolvedDays', e.target.value)}
                placeholder="Enter number of days"
              />
            </FormField>
          )}
        </>
      )}
    </div>
  );
};
