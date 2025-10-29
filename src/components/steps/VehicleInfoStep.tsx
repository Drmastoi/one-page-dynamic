import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '../MultiStepForm';

interface Props {
  formData: Partial<FormData>;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function VehicleInfoStep({ formData, updateFormData }: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Vehicle Information</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>
            Vehicle Location at Time of Accident <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.vehicleLocation || ''}
            onValueChange={(value) => updateFormData({ vehicleLocation: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="highway" id="loc-highway" />
              <Label htmlFor="loc-highway" className="font-normal cursor-pointer">Highway</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="city-street" id="loc-city" />
              <Label htmlFor="loc-city" className="font-normal cursor-pointer">City Street</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parking-lot" id="loc-parking" />
              <Label htmlFor="loc-parking" className="font-normal cursor-pointer">Parking Lot</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="residential" id="loc-residential" />
              <Label htmlFor="loc-residential" className="font-normal cursor-pointer">Residential Area</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Your Vehicle Type <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.vehicleType || ''}
            onValueChange={(value) => updateFormData({ vehicleType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sedan" id="type-sedan" />
              <Label htmlFor="type-sedan" className="font-normal cursor-pointer">Sedan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suv" id="type-suv" />
              <Label htmlFor="type-suv" className="font-normal cursor-pointer">SUV</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="truck" id="type-truck" />
              <Label htmlFor="type-truck" className="font-normal cursor-pointer">Truck</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="van" id="type-van" />
              <Label htmlFor="type-van" className="font-normal cursor-pointer">Van</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="motorcycle" id="type-motorcycle" />
              <Label htmlFor="type-motorcycle" className="font-normal cursor-pointer">Motorcycle</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Vehicle Damage Caused <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.vehicleDamage || ''}
            onValueChange={(value) => updateFormData({ vehicleDamage: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="minor" id="damage-minor" />
              <Label htmlFor="damage-minor" className="font-normal cursor-pointer">Minor (cosmetic)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="damage-moderate" />
              <Label htmlFor="damage-moderate" className="font-normal cursor-pointer">Moderate (drivable)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="severe" id="damage-severe" />
              <Label htmlFor="damage-severe" className="font-normal cursor-pointer">Severe (not drivable)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="totaled" id="damage-totaled" />
              <Label htmlFor="damage-totaled" className="font-normal cursor-pointer">Totaled</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Where was Impact on Your Vehicle <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.impactLocation || ''}
            onValueChange={(value) => updateFormData({ impactLocation: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="front" id="impact-front" />
              <Label htmlFor="impact-front" className="font-normal cursor-pointer">Front</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rear" id="impact-rear" />
              <Label htmlFor="impact-rear" className="font-normal cursor-pointer">Rear</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driver-side" id="impact-driver" />
              <Label htmlFor="impact-driver" className="font-normal cursor-pointer">Driver Side</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="passenger-side" id="impact-passenger" />
              <Label htmlFor="impact-passenger" className="font-normal cursor-pointer">Passenger Side</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Type of Other Vehicle Involved <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.otherVehicleType || ''}
            onValueChange={(value) => updateFormData({ otherVehicleType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sedan" id="other-sedan" />
              <Label htmlFor="other-sedan" className="font-normal cursor-pointer">Sedan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suv" id="other-suv" />
              <Label htmlFor="other-suv" className="font-normal cursor-pointer">SUV</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="truck" id="other-truck" />
              <Label htmlFor="other-truck" className="font-normal cursor-pointer">Truck</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="van" id="other-van" />
              <Label htmlFor="other-van" className="font-normal cursor-pointer">Van</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="motorcycle" id="other-motorcycle" />
              <Label htmlFor="other-motorcycle" className="font-normal cursor-pointer">Motorcycle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="other-none" />
              <Label htmlFor="other-none" className="font-normal cursor-pointer">No Other Vehicle</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
