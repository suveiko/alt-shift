import { openaiClient } from '@shared/api';

import {
  generateBaseTemplate,
  generateUserPrompt,
  GENERATION_CONFIG,
  SYSTEM_PROMPT,
} from './prompts';

import type { ApplicationFormData } from '../model/types';

/**
 * Generates improved application letter using OpenAI
 *
 * @param data - Application form data (company, job title, skills, etc.)
 * @returns Improved cover letter text
 * @throws {HttpError} When OpenAI API returns an error
 * @throws {HttpTimeoutError} When request exceeds timeout
 */
export const generateApplicationLetter = async (
  data: ApplicationFormData,
): Promise<string> => {
  const baseTemplate = generateBaseTemplate(data);
  const userPrompt = generateUserPrompt(baseTemplate);

  const response = await openaiClient.createChatCompletion({
    messages: [SYSTEM_PROMPT, userPrompt],
    ...GENERATION_CONFIG,
  });

  return response.choices[0].message.content;
};
