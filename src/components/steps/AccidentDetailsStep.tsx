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

export default function AccidentDetailsStep({ formData, updateFormData }: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Accident Details</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accidentDate">
              Date of Accident <span className="text-destructive">*</span>
            </Label>
            <Input
              id="accidentDate"
              type="date"
              value={formData.accidentDate || ''}
              onChange={(e) => updateFormData({ accidentDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accidentLocation">
              Location of Accident <span className="text-destructive">*</span>
            </Label>
            <Input
              id="accidentLocation"
              value={formData.accidentLocation || ''}
              onChange={(e) => updateFormData({ accidentLocation: e.target.value })}
              placeholder="Street address or intersection"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accidentDescription">
            Describe What Happened <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="accidentDescription"
            value={formData.accidentDescription || ''}
            onChange={(e) => updateFormData({ accidentDescription: e.target.value })}
            placeholder="Please describe the accident in detail"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>
            Was a Police Report Filed? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.policeReportFiled || ''}
            onValueChange={(value) => updateFormData({ policeReportFiled: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="police-yes" />
              <Label htmlFor="police-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="police-no" />
              <Label htmlFor="police-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.policeReportFiled === 'yes' && (
          <div className="space-y-2">
            <Label htmlFor="policeReportNumber">Police Report Number</Label>
            <Input
              id="policeReportNumber"
              value={formData.policeReportNumber || ''}
              onChange={(e) => updateFormData({ policeReportNumber: e.target.value })}
              placeholder="Report number"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>
            Who Was at Fault? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.faultParty || ''}
            onValueChange={(value) => updateFormData({ faultParty: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other-driver" id="fault-other" />
              <Label htmlFor="fault-other" className="font-normal cursor-pointer">Other Driver</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="me" id="fault-me" />
              <Label htmlFor="fault-me" className="font-normal cursor-pointer">Me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shared" id="fault-shared" />
              <Label htmlFor="fault-shared" className="font-normal cursor-pointer">Shared Fault</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unknown" id="fault-unknown" />
              <Label htmlFor="fault-unknown" className="font-normal cursor-pointer">Unknown</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weatherConditions">Weather Conditions</Label>
            <Input
              id="weatherConditions"
              value={formData.weatherConditions || ''}
              onChange={(e) => updateFormData({ weatherConditions: e.target.value })}
              placeholder="Clear, rainy, foggy, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roadConditions">Road Conditions</Label>
            <Input
              id="roadConditions"
              value={formData.roadConditions || ''}
              onChange={(e) => updateFormData({ roadConditions: e.target.value })}
              placeholder="Dry, wet, icy, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trafficConditions">Traffic Conditions</Label>
            <Input
              id="trafficConditions"
              value={formData.trafficConditions || ''}
              onChange={(e) => updateFormData({ trafficConditions: e.target.value })}
              placeholder="Heavy, light, moderate"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
