import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  field: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, field, required = false, children }: FormFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    {children}
  </div>
);
