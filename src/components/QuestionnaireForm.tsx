import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import AdditionalSections from './AdditionalSections';

interface QuestionnaireFormData {
  [key: string]: string;
}

export default function QuestionnaireForm() {
  const [formData, setFormData] = useState<QuestionnaireFormData>({} as QuestionnaireFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-questionnaire`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      toast({
        title: "Success!",
        description: "Your questionnaire has been submitted successfully. You will receive a confirmation email shortly.",
      });

      // Reset form
      setFormData({});
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your questionnaire. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({ 
    label, 
    field, 
    required = false, 
    children 
  }: { 
    label: string; 
    field: string; 
    required?: boolean; 
    children: React.ReactNode; 
  }) => (
    <div className="space-y-2">
      <Label className="text-form-label font-medium">
        {label}
        {required && <span className="text-form-required ml-1">*</span>}
      </Label>
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Personal Information */}
      <Card id="section-1" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 1: Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
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
        </div>

        <div className="mt-4 space-y-4">
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
      </Card>

      <Separator />

      {/* Section 2: Accident Details */}
      <Card id="section-2" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 2: Accident Details</h2>
        <div className="space-y-4">
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
              <Select value={formData.impactLocation || ''} onValueChange={(value) => handleInputChange('impactLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rear">Rear</SelectItem>
                  <SelectItem value="front">Front</SelectItem>
                  <SelectItem value="passenger-side">Passenger Side</SelectItem>
                  <SelectItem value="driver-side">Driver Side</SelectItem>
                </SelectContent>
              </Select>
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
      </Card>

      <Separator />

      {/* Section 3: Neck Pain */}
      <Card id="section-3" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 3: Neck Pain Assessment</h2>
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
      </Card>

      <Separator />

      {/* Section 4: Shoulder Pain */}
      <Card id="section-4" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 4: Shoulder Pain Assessment</h2>
        <div className="space-y-4">
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
      </Card>

      <Separator />

      {/* Section 5: Back Pain */}
      <Card id="section-5" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 5: Back Pain Assessment</h2>
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
      </Card>

      <Separator />

      {/* Section 6: Headache */}
      <Card id="section-6" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 6: Headache Assessment</h2>
        <div className="space-y-4">
          <FormField label="Did you get any headache?" field="headache" required>
            <RadioGroup value={formData.headache || ''} onValueChange={(value) => handleInputChange('headache', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="headache-yes" />
                <Label htmlFor="headache-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="headache-no" />
                <Label htmlFor="headache-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData.headache === 'yes' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When did this pain start?" field="headacheStart">
                  <Select value={formData.headacheStart || ''} onValueChange={(value) => handleInputChange('headacheStart', value)}>
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

                <FormField label="Initial severity of pain" field="headacheInitialSeverity">
                  <Select value={formData.headacheInitialSeverity || ''} onValueChange={(value) => handleInputChange('headacheInitialSeverity', value)}>
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
                <FormField label="Current severity of pain" field="headacheCurrentSeverity">
                  <Select value={formData.headacheCurrentSeverity || ''} onValueChange={(value) => handleInputChange('headacheCurrentSeverity', value)}>
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

                {formData.headacheCurrentSeverity === 'resolved' && (
                  <FormField label="If resolved, how many days did it take?" field="headacheResolvedDays">
                    <Input
                      type="number"
                      min="0"
                      value={formData.headacheResolvedDays || ''}
                      onChange={(e) => handleInputChange('headacheResolvedDays', e.target.value)}
                      placeholder="Enter number of days"
                    />
                  </FormField>
                )}
              </div>

              <FormField label="Past medical history of headache before the accident" field="headacheMedicalHistory">
                <Textarea
                  value={formData.headacheMedicalHistory || ''}
                  onChange={(e) => handleInputChange('headacheMedicalHistory', e.target.value)}
                  placeholder="Please describe any previous headache history"
                  rows={3}
                />
              </FormField>
            </>
          )}
        </div>
      </Card>

      <Separator />

      {/* Section 7: Travel Anxiety */}
      <Card id="section-7" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 7: Travel Anxiety Assessment</h2>
        <div className="space-y-4">
          <FormField label="Did you experience travel anxiety, fear of travelling after the accident?" field="travelAnxiety" required>
            <RadioGroup value={formData.travelAnxiety || ''} onValueChange={(value) => handleInputChange('travelAnxiety', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="travel-anxiety-yes" />
                <Label htmlFor="travel-anxiety-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="travel-anxiety-no" />
                <Label htmlFor="travel-anxiety-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Are you back to driving currently?" field="backToDriving">
              <RadioGroup value={formData.backToDriving || ''} onValueChange={(value) => handleInputChange('backToDriving', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="back-driving-yes" />
                  <Label htmlFor="back-driving-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="back-driving-no" />
                  <Label htmlFor="back-driving-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Are you more cautious driver after the accident?" field="cautiousDriver">
              <RadioGroup value={formData.cautiousDriver || ''} onValueChange={(value) => handleInputChange('cautiousDriver', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="cautious-yes" />
                  <Label htmlFor="cautious-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cautious-no" />
                  <Label htmlFor="cautious-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Do you keep looking in the rear mirror or over the shoulders and worry of being hit again?" field="lookingRearMirror">
              <RadioGroup value={formData.lookingRearMirror || ''} onValueChange={(value) => handleInputChange('lookingRearMirror', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="rear-mirror-yes" />
                  <Label htmlFor="rear-mirror-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="rear-mirror-no" />
                  <Label htmlFor="rear-mirror-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Has it prevented you from driving for leisure and work?" field="preventedDriving">
              <RadioGroup value={formData.preventedDriving || ''} onValueChange={(value) => handleInputChange('preventedDriving', value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="prevented-yes" />
                  <Label htmlFor="prevented-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="prevented-no" />
                  <Label htmlFor="prevented-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>

          {formData.travelAnxiety === 'yes' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When your travel anxiety started" field="anxietyStart">
                  <Select value={formData.anxietyStart || ''} onValueChange={(value) => handleInputChange('anxietyStart', value)}>
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

                <FormField label="Initial severity of travel anxiety" field="anxietyInitialSeverity">
                  <Select value={formData.anxietyInitialSeverity || ''} onValueChange={(value) => handleInputChange('anxietyInitialSeverity', value)}>
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
                <FormField label="Current severity of travel anxiety" field="anxietyCurrentSeverity">
                  <Select value={formData.anxietyCurrentSeverity || ''} onValueChange={(value) => handleInputChange('anxietyCurrentSeverity', value)}>
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

                {formData.anxietyCurrentSeverity === 'resolved' && (
                  <FormField label="If resolved, how many days did it take?" field="anxietyResolvedDays">
                    <Input
                      type="number"
                      min="0"
                      value={formData.anxietyResolvedDays || ''}
                      onChange={(e) => handleInputChange('anxietyResolvedDays', e.target.value)}
                      placeholder="Enter number of days"
                    />
                  </FormField>
                )}
              </div>

              <FormField label="Past medical history of anxiety before the accident" field="anxietyMedicalHistory">
                <Textarea
                  value={formData.anxietyMedicalHistory || ''}
                  onChange={(e) => handleInputChange('anxietyMedicalHistory', e.target.value)}
                  placeholder="Please describe any previous anxiety history"
                  rows={3}
                />
              </FormField>
            </>
          )}
        </div>
      </Card>

      <Separator />

      {/* Additional Sections 8-12 */}
      <AdditionalSections formData={formData} handleInputChange={handleInputChange} />

      <Separator />

      {/* Submit Button */}
      <div className="flex justify-center pt-8">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting}
          className="px-8 py-3 text-lg font-semibold"
        >
          {isSubmitting ? 'Preparing Submission...' : 'Submit Questionnaire'}
        </Button>
      </div>
    </form>
  );
}