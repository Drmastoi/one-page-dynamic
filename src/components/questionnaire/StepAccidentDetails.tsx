import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField } from './FormField';

interface StepAccidentDetailsProps {
  formData: { [key: string]: string };
  handleInputChange: (field: string, value: string) => void;
}

export const StepAccidentDetails = ({ formData, handleInputChange }: StepAccidentDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Date of Accident" field="accidentDate" required>
          <Input
            type="date"
            value={formData.accidentDate || ''}
            onChange={(e) => handleInputChange('accidentDate', e.target.value)}
          />
        </FormField>

        <FormField label="Accident Time" field="accidentTime" required>
          <RadioGroup value={formData.accidentTime || ''} onValueChange={(value) => handleInputChange('accidentTime', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="morning" id="time-morning" />
              <Label htmlFor="time-morning" className="font-normal cursor-pointer">Morning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="afternoon" id="time-afternoon" />
              <Label htmlFor="time-afternoon" className="font-normal cursor-pointer">Afternoon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="evening" id="time-evening" />
              <Label htmlFor="time-evening" className="font-normal cursor-pointer">Evening</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="night" id="time-night" />
              <Label htmlFor="time-night" className="font-normal cursor-pointer">Night</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Your Position in Vehicle" field="vehiclePosition" required>
          <RadioGroup value={formData.vehiclePosition || ''} onValueChange={(value) => handleInputChange('vehiclePosition', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driver" id="pos-driver" />
              <Label htmlFor="pos-driver" className="font-normal cursor-pointer">Driver</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="front-passenger" id="pos-front" />
              <Label htmlFor="pos-front" className="font-normal cursor-pointer">Front Passenger</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="back-passenger" id="pos-back" />
              <Label htmlFor="pos-back" className="font-normal cursor-pointer">Back Passenger</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Your Vehicle Type" field="vehicleType" required>
          <RadioGroup value={formData.vehicleType || ''} onValueChange={(value) => handleInputChange('vehicleType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="car" id="vehicle-car" />
              <Label htmlFor="vehicle-car" className="font-normal cursor-pointer">Car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="van" id="vehicle-van" />
              <Label htmlFor="vehicle-van" className="font-normal cursor-pointer">Van</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lorry" id="vehicle-lorry" />
              <Label htmlFor="vehicle-lorry" className="font-normal cursor-pointer">Lorry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="truck" id="vehicle-truck" />
              <Label htmlFor="vehicle-truck" className="font-normal cursor-pointer">Truck</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bus" id="vehicle-bus" />
              <Label htmlFor="vehicle-bus" className="font-normal cursor-pointer">Bus</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Vehicle Location at Time of Accident" field="vehicleLocation" required>
          <RadioGroup value={formData.vehicleLocation || ''} onValueChange={(value) => handleInputChange('vehicleLocation', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="main-road" id="location-main" />
              <Label htmlFor="location-main" className="font-normal cursor-pointer">Main Road</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="minor-road" id="location-minor" />
              <Label htmlFor="location-minor" className="font-normal cursor-pointer">Minor Road</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="motorway" id="location-motorway" />
              <Label htmlFor="location-motorway" className="font-normal cursor-pointer">Motorway</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roundabout" id="location-roundabout" />
              <Label htmlFor="location-roundabout" className="font-normal cursor-pointer">Roundabout</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parking" id="location-parking" />
              <Label htmlFor="location-parking" className="font-normal cursor-pointer">Parking</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Vehicle Status at Time of Accident" field="vehicleStatus" required>
          <RadioGroup value={formData.vehicleStatus || ''} onValueChange={(value) => handleInputChange('vehicleStatus', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stationary" id="status-stationary" />
              <Label htmlFor="status-stationary" className="font-normal cursor-pointer">Stationary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moving" id="status-moving" />
              <Label htmlFor="status-moving" className="font-normal cursor-pointer">Moving</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parked" id="status-parked" />
              <Label htmlFor="status-parked" className="font-normal cursor-pointer">Parked</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Where was Impact on Your Vehicle" field="impactLocation" required>
          <RadioGroup value={formData.impactLocation || ''} onValueChange={(value) => handleInputChange('impactLocation', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rear" id="impact-rear" />
              <Label htmlFor="impact-rear" className="font-normal cursor-pointer">Rear</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="front" id="impact-front" />
              <Label htmlFor="impact-front" className="font-normal cursor-pointer">Front</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="passenger-side" id="impact-passenger" />
              <Label htmlFor="impact-passenger" className="font-normal cursor-pointer">Passenger Side</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driver-side" id="impact-driver" />
              <Label htmlFor="impact-driver" className="font-normal cursor-pointer">Driver Side</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="How You Were Jolted" field="howJolted" required>
          <RadioGroup value={formData.howJolted || ''} onValueChange={(value) => handleInputChange('howJolted', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="forward-backwards" id="jolt-forward-back" />
              <Label htmlFor="jolt-forward-back" className="font-normal cursor-pointer">Forward & Backwards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="backwards-forward" id="jolt-back-forward" />
              <Label htmlFor="jolt-back-forward" className="font-normal cursor-pointer">Backwards & Forward</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sideways" id="jolt-sideways" />
              <Label htmlFor="jolt-sideways" className="font-normal cursor-pointer">Sideways</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Were You Wearing Seatbelt" field="wearingSeatbelt" required>
          <RadioGroup value={formData.wearingSeatbelt || ''} onValueChange={(value) => handleInputChange('wearingSeatbelt', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="seatbelt-yes" />
              <Label htmlFor="seatbelt-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="seatbelt-no" />
              <Label htmlFor="seatbelt-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Did Your Airbags Go Off" field="airbagsOff" required>
          <RadioGroup value={formData.airbagsOff || ''} onValueChange={(value) => handleInputChange('airbagsOff', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="airbags-yes" />
              <Label htmlFor="airbags-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="airbags-no" />
              <Label htmlFor="airbags-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Vehicle Damage Caused" field="vehicleDamage" required>
          <RadioGroup value={formData.vehicleDamage || ''} onValueChange={(value) => handleInputChange('vehicleDamage', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="written-off" id="damage-written" />
              <Label htmlFor="damage-written" className="font-normal cursor-pointer">Written Off</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate-damage" id="damage-moderate" />
              <Label htmlFor="damage-moderate" className="font-normal cursor-pointer">Moderate Damage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="slight-damage" id="damage-slight" />
              <Label htmlFor="damage-slight" className="font-normal cursor-pointer">Slight Damage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unknown" id="damage-unknown" />
              <Label htmlFor="damage-unknown" className="font-normal cursor-pointer">Unknown</Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Did You Need Help to Get Out of Vehicle" field="needHelp" required>
          <RadioGroup value={formData.needHelp || ''} onValueChange={(value) => handleInputChange('needHelp', value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="help-yes" />
              <Label htmlFor="help-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="help-no" />
              <Label htmlFor="help-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <FormField label="Type of Other Vehicle Involved" field="otherVehicleType" required>
        <RadioGroup value={formData.otherVehicleType || ''} onValueChange={(value) => handleInputChange('otherVehicleType', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="car" id="other-car" />
            <Label htmlFor="other-car" className="font-normal cursor-pointer">Car</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="van" id="other-van" />
            <Label htmlFor="other-van" className="font-normal cursor-pointer">Van</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lorry" id="other-lorry" />
            <Label htmlFor="other-lorry" className="font-normal cursor-pointer">Lorry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="truck" id="other-truck" />
            <Label htmlFor="other-truck" className="font-normal cursor-pointer">Truck</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bus" id="other-bus" />
            <Label htmlFor="other-bus" className="font-normal cursor-pointer">Bus</Label>
          </div>
        </RadioGroup>
      </FormField>
    </div>
  );
};
