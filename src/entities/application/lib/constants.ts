export const PLACEHOLDER_TEXT =
  'Your personalized job application will appear here...';

export const COPY_TIMEOUT_MS = 2000;

export const getAriaLabel = (jobTitle?: string, company?: string): string => {
  if (jobTitle && company) {
    return `Application: ${jobTitle} at ${company}`;
  }

  return 'Job application';
};
