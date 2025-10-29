import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from './FormField';

interface StepOtherInjuriesProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepOtherInjuries = ({ formData, handleInputChange }: StepOtherInjuriesProps) => {
  return (
    <div className="space-y-6">
      <FormField label="Any other injury?" field="otherInjury" required>
        <RadioGroup value={formData.otherInjury || ''} onValueChange={(value) => handleInputChange('otherInjury', value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="other-injury-yes" />
            <Label htmlFor="other-injury-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="other-injury-no" />
            <Label htmlFor="other-injury-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </FormField>

      {formData.otherInjury === 'yes' && (
        <div className="space-y-4 p-4 border border-muted rounded-lg">
          <h3 className="text-lg font-medium text-primary">First Additional Injury</h3>
          <FormField label="Name of injury" field="injuryName">
            <Input
              value={formData.injuryName || ''}
              onChange={(e) => handleInputChange('injuryName', e.target.value)}
              placeholder="Describe the injury"
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="When this injury started" field="injuryStart">
              <Select value={formData.injuryStart || ''} onValueChange={(value) => handleInputChange('injuryStart', value)}>
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

            <FormField label="Initial severity" field="injuryInitialSeverity">
              <Select value={formData.injuryInitialSeverity || ''} onValueChange={(value) => handleInputChange('injuryInitialSeverity', value)}>
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
            <FormField label="Current severity" field="injuryCurrentSeverity">
              <Select value={formData.injuryCurrentSeverity || ''} onValueChange={(value) => handleInputChange('injuryCurrentSeverity', value)}>
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

            {formData.injuryCurrentSeverity === 'resolved' && (
              <FormField label="If resolved, how many days did it take?" field="injuryResolvedDays">
                <Input
                  type="number"
                  min="0"
                  value={formData.injuryResolvedDays || ''}
                  onChange={(e) => handleInputChange('injuryResolvedDays', e.target.value)}
                  placeholder="Enter number of days"
                />
              </FormField>
            )}
          </div>

          <FormField label="Any more injury?" field="moreInjury">
            <RadioGroup value={formData.moreInjury || ''} onValueChange={(value) => handleInputChange('moreInjury', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="more-injury-yes" />
                <Label htmlFor="more-injury-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="more-injury-no" />
                <Label htmlFor="more-injury-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.moreInjury === 'yes' && (
            <div className="space-y-4 p-4 border border-muted rounded-lg bg-muted/30">
              <h4 className="text-md font-medium text-primary">Second Additional Injury</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When this injury started" field="moreInjuryStart">
                  <Select value={formData.moreInjuryStart || ''} onValueChange={(value) => handleInputChange('moreInjuryStart', value)}>
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

                <FormField label="Initial severity" field="moreInjuryInitialSeverity">
                  <Select value={formData.moreInjuryInitialSeverity || ''} onValueChange={(value) => handleInputChange('moreInjuryInitialSeverity', value)}>
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
                <FormField label="Current severity" field="moreInjuryCurrentSeverity">
                  <Select value={formData.moreInjuryCurrentSeverity || ''} onValueChange={(value) => handleInputChange('moreInjuryCurrentSeverity', value)}>
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

                {formData.moreInjuryCurrentSeverity === 'resolved' && (
                  <FormField label="If resolved, how many days did it take?" field="moreInjuryResolvedDays">
                    <Input
                      type="number"
                      min="0"
                      value={formData.moreInjuryResolvedDays || ''}
                      onChange={(e) => handleInputChange('moreInjuryResolvedDays', e.target.value)}
                      placeholder="Enter number of days"
                    />
                  </FormField>
                )}
              </div>
            </div>
          )}

          <FormField label="Any further injury you want to mention?" field="furtherInjury">
            <RadioGroup value={formData.furtherInjury || ''} onValueChange={(value) => handleInputChange('furtherInjury', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="further-injury-yes" />
                <Label htmlFor="further-injury-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="further-injury-no" />
                <Label htmlFor="further-injury-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.furtherInjury === 'yes' && (
            <div className="space-y-4 p-4 border border-muted rounded-lg bg-muted/30">
              <h4 className="text-md font-medium text-primary">Third Additional Injury</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When this injury started" field="furtherInjuryStart">
                  <Select value={formData.furtherInjuryStart || ''} onValueChange={(value) => handleInputChange('furtherInjuryStart', value)}>
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

                <FormField label="Initial severity" field="furtherInjuryInitialSeverity">
                  <Select value={formData.furtherInjuryInitialSeverity || ''} onValueChange={(value) => handleInputChange('furtherInjuryInitialSeverity', value)}>
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
                <FormField label="Current severity" field="furtherInjuryCurrentSeverity">
                  <Select value={formData.furtherInjuryCurrentSeverity || ''} onValueChange={(value) => handleInputChange('furtherInjuryCurrentSeverity', value)}>
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

                {formData.furtherInjuryCurrentSeverity === 'resolved' && (
                  <FormField label="If resolved, how many days did it take?" field="furtherInjuryResolvedDays">
                    <Input
                      type="number"
                      min="0"
                      value={formData.furtherInjuryResolvedDays || ''}
                      onChange={(e) => handleInputChange('furtherInjuryResolvedDays', e.target.value)}
                      placeholder="Enter number of days"
                    />
                  </FormField>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
