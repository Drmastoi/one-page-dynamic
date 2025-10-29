import { z } from 'zod';

// Helper schemas for common patterns
const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
const zipCodeRegex = /^\d{5}(-\d{4})?$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const questionnaireSchema = z.object({
  // Personal Information
  fullName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .trim()
    .regex(phoneRegex, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),
  
  address: z.string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  
  city: z.string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  
  state: z.string()
    .trim()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  
  zipCode: z.string()
    .trim()
    .regex(zipCodeRegex, 'Invalid ZIP code format (e.g., 12345 or 12345-6789)'),
  
  dateOfBirth: z.string()
    .regex(dateRegex, 'Invalid date format (YYYY-MM-DD)')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 16 && age <= 120;
    }, 'Age must be between 16 and 120 years'),
  
  // Accident Details
  accidentDate: z.string()
    .regex(dateRegex, 'Invalid date format (YYYY-MM-DD)')
    .refine((date) => {
      const accidentDate = new Date(date);
      const today = new Date();
      return accidentDate <= today;
    }, 'Accident date cannot be in the future'),
  
  accidentLocation: z.string()
    .trim()
    .min(5, 'Location must be at least 5 characters')
    .max(300, 'Location must be less than 300 characters'),
  
  accidentDescription: z.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  
  policeReportFiled: z.enum(['yes', 'no']),
  
  policeReportNumber: z.string()
    .trim()
    .max(100, 'Report number must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  
  faultParty: z.enum(['me', 'other', 'both', 'unknown']),
  
  weatherConditions: z.string()
    .trim()
    .max(200, 'Weather conditions must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  roadConditions: z.string()
    .trim()
    .max(200, 'Road conditions must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  trafficConditions: z.string()
    .trim()
    .max(200, 'Traffic conditions must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  // Vehicle Information
  vehicleLocation: z.enum(['driver', 'passenger', 'pedestrian', 'cyclist', 'other']),
  
  vehicleType: z.enum(['sedan', 'suv', 'truck', 'motorcycle', 'bicycle', 'pedestrian', 'other']),
  
  vehicleDamage: z.enum(['none', 'minor', 'moderate', 'severe', 'totaled']),
  
  impactLocation: z.enum(['front', 'rear', 'driver-side', 'passenger-side', 'multiple', 'other']),
  
  otherVehicleType: z.enum(['sedan', 'suv', 'truck', 'motorcycle', 'bicycle', 'pedestrian', 'multiple', 'unknown']),
  
  // Injuries and Medical
  immediatePain: z.enum(['yes', 'no']),
  
  currentPain: z.enum(['yes', 'no']),
  
  injuryDescription: z.string()
    .trim()
    .min(5, 'Injury description must be at least 5 characters')
    .max(5000, 'Injury description must be less than 5000 characters'),
  
  medicalTreatment: z.enum(['emergency-room', 'urgent-care', 'primary-doctor', 'none']),
  
  hospitalName: z.string()
    .trim()
    .max(200, 'Hospital name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  doctorName: z.string()
    .trim()
    .max(200, 'Doctor name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  ongoingTreatment: z.enum(['yes', 'no']),
  
  // Additional Information
  whoLivesWithYou: z.enum(['alone', 'spouse', 'family', 'roommates', 'other']),
  
  witnesses: z.enum(['yes', 'no']),
  
  witnessDetails: z.string()
    .trim()
    .max(2000, 'Witness details must be less than 2000 characters')
    .optional()
    .or(z.literal('')),
  
  insuranceCompany: z.string()
    .trim()
    .min(2, 'Insurance company must be at least 2 characters')
    .max(200, 'Insurance company must be less than 200 characters'),
  
  policyNumber: z.string()
    .trim()
    .max(100, 'Policy number must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  
  claimFiled: z.enum(['yes', 'no', 'pending']),
  
  // Photos (optional, handled separately)
  photos: z.any().optional(),
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;
