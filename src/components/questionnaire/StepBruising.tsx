import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';

interface StepBruisingProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepBruising = ({ formData, handleInputChange }: StepBruisingProps) => {
  return (
    <div className="space-y-4">
      <FormField label="Is there any bruising or scarring on the body due to this accident?" field="bruising" required>
        <RadioGroup value={formData.bruising || ''} onValueChange={(value) => handleInputChange('bruising', value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="bruising-yes" />
            <Label htmlFor="bruising-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="bruising-no" />
            <Label htmlFor="bruising-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </FormField>

      {formData.bruising === 'yes' && (
        <>
          <FormField label="Location of bruising or scar" field="bruisingLocation">
            <Textarea
              value={formData.bruisingLocation || ''}
              onChange={(e) => handleInputChange('bruisingLocation', e.target.value)}
              placeholder="Describe the location of bruising or scarring"
              rows={3}
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="When did you notice it?" field="bruisingNoticed">
              <Select value={formData.bruisingNoticed || ''} onValueChange={(value) => handleInputChange('bruisingNoticed', value)}>
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

            <FormField label="Initial severity" field="bruisingInitialSeverity">
              <Select value={formData.bruisingInitialSeverity || ''} onValueChange={(value) => handleInputChange('bruisingInitialSeverity', value)}>
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
            <FormField label="Current severity" field="bruisingCurrentSeverity">
              <Select value={formData.bruisingCurrentSeverity || ''} onValueChange={(value) => handleInputChange('bruisingCurrentSeverity', value)}>
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

            {formData.bruisingCurrentSeverity === 'resolved' && (
              <FormField label="If resolved, how many days did it take?" field="bruisingResolvedDays">
                <Input
                  type="number"
                  min="0"
                  value={formData.bruisingResolvedDays || ''}
                  onChange={(e) => handleInputChange('bruisingResolvedDays', e.target.value)}
                  placeholder="Enter number of days"
                />
              </FormField>
            )}
          </div>

          <FormField label="Is there any visible scar?" field="visibleScar">
            <Textarea
              value={formData.visibleScar || ''}
              onChange={(e) => handleInputChange('visibleScar', e.target.value)}
              placeholder="Describe any visible scarring"
              rows={3}
            />
          </FormField>
        </>
      )}
    </div>
  );
};
