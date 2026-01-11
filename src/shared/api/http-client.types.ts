export class HttpTimeoutError extends Error {
  public readonly timeout: number;

  constructor(message: string, timeout: number) {
    super(message);
    this.name = 'HttpTimeoutError';
    this.timeout = timeout;
    Object.setPrototypeOf(this, HttpTimeoutError.prototype);
  }
}

export class HttpError extends Error {
  public readonly status: number;
  public readonly response?: unknown;

  constructor(message: string, status: number, response?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.response = response;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
