import { HttpError, HttpTimeoutError } from './http-client.types';

const DEFAULT_TIMEOUT = 30_000;

/**
 * Simple HTTP POST request with timeout and error handling
 */
export async function httpPost<TRequest, TResponse>(
  url: string,
  data: TRequest,
  headers: Record<string, string> = {},
  timeout: number = DEFAULT_TIMEOUT,
): Promise<TResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      throw new HttpError(
        error.error?.message || `HTTP Error: ${response.status}`,
        response.status,
        error,
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new HttpTimeoutError(`Request timeout after ${timeout}ms`, timeout);
    }

    throw error;
  }
}
