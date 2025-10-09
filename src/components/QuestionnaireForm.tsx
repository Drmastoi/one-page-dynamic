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
            <Select onValueChange={(value) => handleInputChange('idType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driving-license">Driving License</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="id-card">ID Card</SelectItem>
              </SelectContent>
            </Select>
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
              <Select onValueChange={(value) => handleInputChange('workType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Who Lives with You at Home" field="livingWith">
              <Select onValueChange={(value) => handleInputChange('livingWith', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select living situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wife">Wife</SelectItem>
                  <SelectItem value="husband">Husband</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="parents">Parents</SelectItem>
                  <SelectItem value="alone">Alone</SelectItem>
                </SelectContent>
              </Select>
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
              <Select onValueChange={(value) => handleInputChange('accidentTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Your Position in Vehicle" field="vehiclePosition" required>
              <Select onValueChange={(value) => handleInputChange('vehiclePosition', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="front-passenger">Front Passenger</SelectItem>
                  <SelectItem value="back-passenger">Back Passenger</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Your Vehicle Type" field="vehicleType" required>
              <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="lorry">Lorry</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Vehicle Location at Time of Accident" field="vehicleLocation" required>
              <Select onValueChange={(value) => handleInputChange('vehicleLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-road">Main Road</SelectItem>
                  <SelectItem value="minor-road">Minor Road</SelectItem>
                  <SelectItem value="motorway">Motorway</SelectItem>
                  <SelectItem value="roundabout">Roundabout</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Vehicle Status at Time of Accident" field="vehicleStatus" required>
              <Select onValueChange={(value) => handleInputChange('vehicleStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stationary">Stationary</SelectItem>
                  <SelectItem value="moving">Moving</SelectItem>
                  <SelectItem value="parked">Parked</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Where was Impact on Your Vehicle" field="impactLocation" required>
              <Select onValueChange={(value) => handleInputChange('impactLocation', value)}>
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
              <Select onValueChange={(value) => handleInputChange('howJolted', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jolt direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forward-backwards">Forward & Backwards</SelectItem>
                  <SelectItem value="backwards-forward">Backwards & Forward</SelectItem>
                  <SelectItem value="sideways">Sideways</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Were You Wearing Seatbelt" field="wearingSeatbelt" required>
              <Select onValueChange={(value) => handleInputChange('wearingSeatbelt', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Did Your Airbags Go Off" field="airbagsOff" required>
              <Select onValueChange={(value) => handleInputChange('airbagsOff', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Vehicle Damage Caused" field="vehicleDamage" required>
              <Select onValueChange={(value) => handleInputChange('vehicleDamage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select damage level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="written-off">Written Off</SelectItem>
                  <SelectItem value="moderate-damage">Moderate Damage</SelectItem>
                  <SelectItem value="slight-damage">Slight Damage</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Did You Need Help to Get Out of Vehicle" field="needHelp" required>
              <Select onValueChange={(value) => handleInputChange('needHelp', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label="Type of Other Vehicle Involved" field="otherVehicleType" required>
            <Select onValueChange={(value) => handleInputChange('otherVehicleType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select other vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="lorry">Lorry</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </Card>

      <Separator />

      {/* Section 3: Neck Pain */}
      <Card id="section-3" className="p-6 bg-form-section border-form-section-border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Section 3: Neck Pain Assessment</h2>
        <div className="space-y-4">
          <FormField label="Did you get any neck pain after the accident?" field="neckPain" required>
            <Select onValueChange={(value) => handleInputChange('neckPain', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {formData.neckPain === 'yes' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Which side of neck?" field="neckSide">
                  <Select onValueChange={(value) => handleInputChange('neckSide', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('neckPainStart', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('neckInitialSeverity', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('neckCurrentSeverity', value)}>
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
            <Select onValueChange={(value) => handleInputChange('shoulderPain', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {formData.shoulderPain === 'yes' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField label="Which side of shoulder?" field="shoulderSide">
                  <Select onValueChange={(value) => handleInputChange('shoulderSide', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('shoulderPainStart', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('shoulderInitialSeverity', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('shoulderCurrentSeverity', value)}>
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
            <Select onValueChange={(value) => handleInputChange('backPain', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {formData.backPain === 'yes' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Where in the back?" field="backLocation">
                  <Select onValueChange={(value) => handleInputChange('backLocation', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('backPainStart', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('backInitialSeverity', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('backCurrentSeverity', value)}>
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
            <Select onValueChange={(value) => handleInputChange('headache', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {formData.headache === 'yes' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When did this pain start?" field="headacheStart">
                  <Select onValueChange={(value) => handleInputChange('headacheStart', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('headacheInitialSeverity', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('headacheCurrentSeverity', value)}>
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
            <Select onValueChange={(value) => handleInputChange('travelAnxiety', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Are you back to driving currently?" field="backToDriving">
              <Select onValueChange={(value) => handleInputChange('backToDriving', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Are you more cautious driver after the accident?" field="cautiousDriver">
              <Select onValueChange={(value) => handleInputChange('cautiousDriver', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Do you keep looking in the rear mirror or over the shoulders and worry of being hit again?" field="lookingRearMirror">
              <Select onValueChange={(value) => handleInputChange('lookingRearMirror', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Has it prevented you from driving for leisure and work?" field="preventedDriving">
              <Select onValueChange={(value) => handleInputChange('preventedDriving', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {formData.travelAnxiety === 'yes' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="When your travel anxiety started" field="anxietyStart">
                  <Select onValueChange={(value) => handleInputChange('anxietyStart', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('anxietyInitialSeverity', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('anxietyCurrentSeverity', value)}>
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