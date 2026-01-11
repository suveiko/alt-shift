import { describe, expect, it, vi } from 'vitest';

import { sleep } from '../sleep';

describe('sleep', () => {
  it('should resolve after specified milliseconds', async () => {
    vi.useFakeTimers();

    const promise = sleep(1000);
    let resolved = false;

    promise.then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);

    vi.advanceTimersByTime(999);
    await Promise.resolve();
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await Promise.resolve();
    expect(resolved).toBe(true);

    vi.useRealTimers();
  });

  it('should resolve immediately when ms is 0', async () => {
    vi.useFakeTimers();

    const promise = sleep(0);
    let resolved = false;

    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(0);
    await Promise.resolve();
    expect(resolved).toBe(true);

    vi.useRealTimers();
  });

  it('should return a promise', () => {
    const result = sleep(100);

    expect(result).toBeInstanceOf(Promise);
  });
});
