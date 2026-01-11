export const STORAGE_KEYS = {
  applications: 'applications',
} as const;

export const PROGRESS = {
  goalApplications: 5,
} as const;

export const VALIDATION_LIMITS = {
  jobTitle: {
    min: 1,
    max: 100,
  },
  company: {
    min: 1,
    max: 100,
  },
  skills: {
    min: 1,
    max: 200,
  },
  additionalDetails: {
    min: 0,
    max: 1200,
  },
} as const;
