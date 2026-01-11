import { z } from 'zod';

import type { ApplicationFormData } from '@entities/application';

import { VALIDATION_LIMITS } from '@shared/config';

export const applicationFormSchema = z.object({
  jobTitle: z
    .string()
    .min(VALIDATION_LIMITS.jobTitle.min, '')
    .max(VALIDATION_LIMITS.jobTitle.max, '')
    .refine((value) => {
      return value.trim() !== '';
    }, ''),
  company: z
    .string()
    .min(VALIDATION_LIMITS.company.min, '')
    .max(VALIDATION_LIMITS.company.max, '')
    .refine((value) => {
      return value.trim() !== '';
    }, ''),
  skills: z
    .string()
    .min(VALIDATION_LIMITS.skills.min, '')
    .max(VALIDATION_LIMITS.skills.max, '')
    .refine((value) => {
      return value.trim() !== '';
    }, ''),
  additionalDetails: z
    .string()
    .max(VALIDATION_LIMITS.additionalDetails.max, '')
    .or(z.literal('')),
}) satisfies z.ZodType<ApplicationFormData>;
