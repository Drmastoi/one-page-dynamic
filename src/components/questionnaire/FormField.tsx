import React from 'react';
import { Label } from '@/components/ui/label';

export const FormField = ({ 
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
