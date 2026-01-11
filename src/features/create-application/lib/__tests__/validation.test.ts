import { describe, expect, it } from 'vitest';

import { VALIDATION_LIMITS } from '@shared/config';

import { applicationFormSchema } from '../validation';

describe('applicationFormSchema', () => {
  it('should accept valid complete form', () => {
    const data = {
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Startup Inc.',
      skills: 'React, TypeScript, Node.js, GraphQL',
      additionalDetails:
        'I have 7 years of experience in web development with a focus on React ecosystem.',
    };

    const result = applicationFormSchema.safeParse(data);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(data);
    }
  });

  it('should reject form with empty required fields', () => {
    const data = {
      jobTitle: '',
      company: '',
      skills: '',
      additionalDetails: '',
    };

    const result = applicationFormSchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  it('should reject form with whitespace-only required fields', () => {
    const data = {
      jobTitle: '   ',
      company: '   ',
      skills: '   ',
      additionalDetails: '',
    };

    const result = applicationFormSchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  it('should reject fields exceeding max length', () => {
    const data = {
      jobTitle: 'a'.repeat(VALIDATION_LIMITS.jobTitle.max + 1),
      company: 'Tech Corp',
      skills: 'React',
      additionalDetails: '',
    };

    const result = applicationFormSchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  it('should accept optional additionalDetails field', () => {
    const data = {
      jobTitle: 'Developer',
      company: 'Tech Corp',
      skills: 'React, TypeScript',
      additionalDetails: '',
    };

    const result = applicationFormSchema.safeParse(data);

    expect(result.success).toBe(true);
  });
});
