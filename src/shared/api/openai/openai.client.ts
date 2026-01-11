import { httpPost } from '../http-client';
import { OPENAI_CONFIG, OPENAI_ENDPOINTS } from './openai.config';

import type {
  OpenAIChatCompletionRequest,
  OpenAIChatCompletionResponse,
} from './openai.types';

class OpenAIClient {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor() {
    this.apiKey = OPENAI_CONFIG.apiKey;
    this.model = OPENAI_CONFIG.model;
    this.baseURL = OPENAI_CONFIG.baseURL;
    this.timeout = OPENAI_CONFIG.timeout;
  }

  /**
   * Creates a chat completion using OpenAI API
   */
  async createChatCompletion(
    request: Omit<OpenAIChatCompletionRequest, 'model'>,
  ): Promise<OpenAIChatCompletionResponse> {
    const url = `${this.baseURL}${OPENAI_ENDPOINTS.CHAT_COMPLETIONS}`;

    return httpPost<OpenAIChatCompletionRequest, OpenAIChatCompletionResponse>(
      url,
      {
        ...request,
        model: this.model,
      },
      {
        Authorization: `Bearer ${this.apiKey}`,
      },
      this.timeout,
    );
  }
}

export const openaiClient = new OpenAIClient();
