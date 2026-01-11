import type { ApplicationFormData } from '../../model/types';

/**
 * Generates base cover letter template from form data
 */
export const generateBaseTemplate = (data: ApplicationFormData): string => {
  return `Dear ${data.company} Team,

I am writing to express my interest in the ${data.jobTitle} position.

My experience in the realm combined with my skills in ${data.skills} make me a strong candidate for this role.

${data.additionalDetails || 'I am excited about the opportunity to contribute to your team.'}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;
};
