import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '../MultiStepForm';

interface Props {
  formData: Partial<FormData>;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function InjuryMedicalStep({ formData, updateFormData }: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Injuries & Medical Treatment</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Did You Feel Pain Immediately After the Accident? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.immediatePain || ''}
            onValueChange={(value) => updateFormData({ immediatePain: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="immediate-yes" />
              <Label htmlFor="immediate-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="immediate-no" />
              <Label htmlFor="immediate-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Are You Currently Experiencing Pain? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.currentPain || ''}
            onValueChange={(value) => updateFormData({ currentPain: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="current-yes" />
              <Label htmlFor="current-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="current-no" />
              <Label htmlFor="current-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="injuryDescription">
            Describe Your Injuries <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="injuryDescription"
            value={formData.injuryDescription || ''}
            onChange={(e) => updateFormData({ injuryDescription: e.target.value })}
            placeholder="Please describe any injuries you sustained"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>
            Did You Receive Medical Treatment? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.medicalTreatment || ''}
            onValueChange={(value) => updateFormData({ medicalTreatment: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="emergency-room" id="treatment-er" />
              <Label htmlFor="treatment-er" className="font-normal cursor-pointer">Emergency Room</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent-care" id="treatment-urgent" />
              <Label htmlFor="treatment-urgent" className="font-normal cursor-pointer">Urgent Care</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="primary-doctor" id="treatment-primary" />
              <Label htmlFor="treatment-primary" className="font-normal cursor-pointer">Primary Doctor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="treatment-none" />
              <Label htmlFor="treatment-none" className="font-normal cursor-pointer">No Treatment</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.medicalTreatment && formData.medicalTreatment !== 'none' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                <Input
                  id="hospitalName"
                  value={formData.hospitalName || ''}
                  onChange={(e) => updateFormData({ hospitalName: e.target.value })}
                  placeholder="Name of facility"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor's Name</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName || ''}
                  onChange={(e) => updateFormData({ doctorName: e.target.value })}
                  placeholder="Treating physician"
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>
            Are You Currently in Ongoing Treatment? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.ongoingTreatment || ''}
            onValueChange={(value) => updateFormData({ ongoingTreatment: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="ongoing-yes" />
              <Label htmlFor="ongoing-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="ongoing-no" />
              <Label htmlFor="ongoing-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
