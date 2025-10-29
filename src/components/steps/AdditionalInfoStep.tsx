import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface Props {
  formData: Partial<FormData>;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function AdditionalInfoStep({ formData, updateFormData }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const existingFiles = formData.photos || [];
    updateFormData({ photos: [...existingFiles, ...files] });
  };

  const removeFile = (index: number) => {
    const files = formData.photos || [];
    const newFiles = files.filter((_, i) => i !== index);
    updateFormData({ photos: newFiles });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Additional Information</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Who Lives with You at Home <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.whoLivesWithYou || ''}
            onValueChange={(value) => updateFormData({ whoLivesWithYou: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alone" id="lives-alone" />
              <Label htmlFor="lives-alone" className="font-normal cursor-pointer">Alone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spouse" id="lives-spouse" />
              <Label htmlFor="lives-spouse" className="font-normal cursor-pointer">Spouse/Partner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="lives-family" />
              <Label htmlFor="lives-family" className="font-normal cursor-pointer">Family</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roommates" id="lives-roommates" />
              <Label htmlFor="lives-roommates" className="font-normal cursor-pointer">Roommates</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>
            Were There Any Witnesses? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.witnesses || ''}
            onValueChange={(value) => updateFormData({ witnesses: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="witnesses-yes" />
              <Label htmlFor="witnesses-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="witnesses-no" />
              <Label htmlFor="witnesses-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.witnesses === 'yes' && (
          <div className="space-y-2">
            <Label htmlFor="witnessDetails">Witness Details</Label>
            <Textarea
              id="witnessDetails"
              value={formData.witnessDetails || ''}
              onChange={(e) => updateFormData({ witnessDetails: e.target.value })}
              placeholder="Names and contact information of witnesses"
              rows={3}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceCompany">
              Insurance Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="insuranceCompany"
              value={formData.insuranceCompany || ''}
              onChange={(e) => updateFormData({ insuranceCompany: e.target.value })}
              placeholder="Your insurance company"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="policyNumber">Policy Number</Label>
            <Input
              id="policyNumber"
              value={formData.policyNumber || ''}
              onChange={(e) => updateFormData({ policyNumber: e.target.value })}
              placeholder="Your policy number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Have You Filed an Insurance Claim? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.claimFiled || ''}
            onValueChange={(value) => updateFormData({ claimFiled: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="claim-yes" />
              <Label htmlFor="claim-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="claim-no" />
              <Label htmlFor="claim-no" className="font-normal cursor-pointer">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-progress" id="claim-progress" />
              <Label htmlFor="claim-progress" className="font-normal cursor-pointer">In Progress</Label>
            </div>
          </RadioGroup>
        </div>

        {/* File Upload Section */}
        <div className="space-y-2">
          <Label>Upload Accident Photos (Optional)</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Upload photos of the accident scene, vehicle damage, or injuries (Max 10MB per file)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>

          {formData.photos && formData.photos.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Selected Files:</p>
              {formData.photos.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
