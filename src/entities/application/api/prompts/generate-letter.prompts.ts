import type { OpenAIChatMessage } from '@shared/api';

/**
 * System prompt for cover letter generation
 */
export const SYSTEM_PROMPT: OpenAIChatMessage = {
  role: 'system',
  content: `You are a career writing expert. Your task is to improve cover letters by:
- Replacing generic phrases with specific, engaging ones
- Making openings more compelling
- Keeping or reducing length (never making it longer)
- Maintaining professional tone
- Preserving the original structure

CRITICAL: The output must be equal or shorter in length than the input. No additions, only improvements.`,
};

/**
 * Generates user prompt for cover letter improvement
 */
export const generateUserPrompt = (baseTemplate: string): OpenAIChatMessage => {
  return {
    role: 'user',
    content: `Improve this cover letter to make it more engaging and personalized while keeping the EXACT SAME LENGTH or shorter:

${baseTemplate}

Requirements:
- Keep the same structure (greeting, interest, skills, details, confidence, thanks)
- Replace generic phrases with more specific, engaging language
- Make the opening line more compelling (avoid "I am writing to express")
- CRITICAL: Output must be the SAME LENGTH or SHORTER than the input
- Maximum 150 words total
- Keep it professional but personable
- Don't add extra paragraphs or elaboration`,
  };
};

/**
 * OpenAI request configuration for letter generation
 */
export const GENERATION_CONFIG = {
  max_completion_tokens: 300,
  temperature: 0.7,
} as const;
