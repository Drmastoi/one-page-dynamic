import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';

interface StepBackPainProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepBackPain = ({ formData, handleInputChange }: StepBackPainProps) => {
  return (
    <div className="space-y-4">
      <FormField label="Did you get any back pain?" field="backPain" required>
        <RadioGroup value={formData.backPain || ''} onValueChange={(value) => handleInputChange('backPain', value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="back-pain-yes" />
            <Label htmlFor="back-pain-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="back-pain-no" />
            <Label htmlFor="back-pain-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </FormField>

      {formData.backPain === 'yes' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Where in the back?" field="backLocation">
              <Select value={formData.backLocation || ''} onValueChange={(value) => handleInputChange('backLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upper-back">Upper Back</SelectItem>
                  <SelectItem value="middle-back">Middle Back</SelectItem>
                  <SelectItem value="lower-back">Lower Back</SelectItem>
                  <SelectItem value="all-over-back">All Over Back</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="When did this pain start?" field="backPainStart">
              <Select value={formData.backPainStart || ''} onValueChange={(value) => handleInputChange('backPainStart', value)}>
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

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Initial severity of pain" field="backInitialSeverity">
              <Select value={formData.backInitialSeverity || ''} onValueChange={(value) => handleInputChange('backInitialSeverity', value)}>
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

            <FormField label="Current severity of pain" field="backCurrentSeverity">
              <Select value={formData.backCurrentSeverity || ''} onValueChange={(value) => handleInputChange('backCurrentSeverity', value)}>
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

          {formData.backCurrentSeverity === 'resolved' && (
            <FormField label="If resolved, how many days did it take?" field="backResolvedDays">
              <Input
                type="number"
                min="0"
                value={formData.backResolvedDays || ''}
                onChange={(e) => handleInputChange('backResolvedDays', e.target.value)}
                placeholder="Enter number of days"
              />
            </FormField>
          )}
        </>
      )}
    </div>
  );
};
