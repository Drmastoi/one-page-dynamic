import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField } from './FormField';

interface StepPersonalInfoProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepPersonalInfo = ({ formData, handleInputChange }: StepPersonalInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Full Name" field="fullName" required>
          <Input
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </FormField>

        <FormField label="Date of Birth" field="dateOfBirth" required>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Type of ID" field="idType" required>
        <RadioGroup value={formData.idType || ''} onValueChange={(value) => handleInputChange('idType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="driving-license" id="id-driving-license" />
            <Label htmlFor="id-driving-license" className="font-normal cursor-pointer">Driving License</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="passport" id="id-passport" />
            <Label htmlFor="id-passport" className="font-normal cursor-pointer">Passport</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="id-card" id="id-card" />
            <Label htmlFor="id-card" className="font-normal cursor-pointer">ID Card</Label>
          </div>
        </RadioGroup>
      </FormField>

      <FormField label="Email Address" field="email" required>
        <Input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
        />
      </FormField>

      <FormField label="Full Address" field="fullAddress" required>
        <Textarea
          value={formData.fullAddress || ''}
          onChange={(e) => handleInputChange('fullAddress', e.target.value)}
          placeholder="Enter your complete address"
          rows={3}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Occupation at Time of Accident" field="occupation" required>
          <Input
            value={formData.occupation || ''}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            placeholder="Enter your occupation"
          />
        </FormField>

        <FormField label="Work Type" field="workType" required>
          <RadioGroup value={formData.workType || ''} onValueChange={(value) => handleInputChange('workType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="work-full-time" />
              <Label htmlFor="work-full-time" className="font-normal cursor-pointer">Full Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="part-time" id="work-part-time" />
              <Label htmlFor="work-part-time" className="font-normal cursor-pointer">Part Time</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Who Lives with You at Home" field="livingWith">
          <RadioGroup value={formData.livingWith || ''} onValueChange={(value) => handleInputChange('livingWith', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wife" id="living-wife" />
              <Label htmlFor="living-wife" className="font-normal cursor-pointer">Wife</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="husband" id="living-husband" />
              <Label htmlFor="living-husband" className="font-normal cursor-pointer">Husband</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partner" id="living-partner" />
              <Label htmlFor="living-partner" className="font-normal cursor-pointer">Partner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parents" id="living-parents" />
              <Label htmlFor="living-parents" className="font-normal cursor-pointer">Parents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alone" id="living-alone" />
              <Label htmlFor="living-alone" className="font-normal cursor-pointer">Alone</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Number of Children at Home" field="numberOfChildren">
          <Input
            type="number"
            min="0"
            value={formData.numberOfChildren || ''}
            onChange={(e) => handleInputChange('numberOfChildren', e.target.value)}
            placeholder="Enter number of children"
          />
        </FormField>
      </div>
    </div>
  );
};
