const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_API_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL;

if (!OPENAI_BASE_URL || !OPENAI_API_KEY || !OPENAI_MODEL) {
  throw new Error('Missing OpenAI configuration. Please check your .env file.');
}

export const OPENAI_ENDPOINTS = {
  CHAT_COMPLETIONS: 'v1/chat/completions',
} as const;

export const OPENAI_CONFIG = {
  baseURL: OPENAI_BASE_URL,
  apiKey: OPENAI_API_KEY,
  model: OPENAI_MODEL,
  timeout: 60_000,
} as const;
