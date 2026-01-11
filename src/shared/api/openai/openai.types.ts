export type OpenAIChatRole = 'system' | 'user' | 'assistant';

export type OpenAIChatMessage = {
  role: OpenAIChatRole;
  content: string;
};

export type OpenAIChatCompletionRequest = {
  model: string;
  messages: OpenAIChatMessage[];
  max_completion_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
};

export type OpenAIChatCompletionChoice = {
  index: number;
  message: OpenAIChatMessage;
  finish_reason: string;
};

export type OpenAIChatCompletionUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type OpenAIChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChatCompletionChoice[];
  usage: OpenAIChatCompletionUsage;
};

export type OpenAIErrorResponse = {
  error: {
    message: string;
    type: string;
    param?: string;
    code?: string;
  };
};
