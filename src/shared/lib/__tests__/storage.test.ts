import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Storage } from '../storage';

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('localStorage', () => {
    it('should store and retrieve a value', () => {
      const storage = new Storage('local');

      storage.set('key', { value: 'test' });
      const result = storage.get<{ value: string }>('key');

      expect(result).toEqual({ value: 'test' });
    });

    it('should return null for non-existent key', () => {
      const storage = new Storage('local');
      const result = storage.get('non-existent');

      expect(result).toBeNull();
    });

    it('should remove a value', () => {
      const storage = new Storage('local');

      storage.set('key', 'value');
      expect(storage.get('key')).toBe('value');

      storage.remove('key');
      expect(storage.get('key')).toBeNull();
    });

    it('should clear all values', () => {
      const storage = new Storage('local');

      storage.set('key1', 'value1');
      storage.set('key2', 'value2');

      storage.clear();

      expect(storage.get('key1')).toBeNull();
      expect(storage.get('key2')).toBeNull();
    });

    it('should use prefix when provided', () => {
      const storage = new Storage('local', 'app');

      storage.set('key', 'value');

      expect(localStorage.getItem('app:key')).toBe(JSON.stringify('value'));
      expect(storage.get('key')).toBe('value');
    });

    it('should handle complex objects', () => {
      const storage = new Storage('local');

      const complexObject = {
        name: 'John',
        age: 30,
        hobbies: ['reading', 'coding'],
        address: { city: 'New York', zip: '10001' },
      };

      storage.set('user', complexObject);
      const result = storage.get<typeof complexObject>('user');

      expect(result).toEqual(complexObject);
    });

    it('should handle arrays', () => {
      const storage = new Storage('local');
      const array = [1, 2, 3, 4, 5];

      storage.set('numbers', array);
      const result = storage.get<number[]>('numbers');

      expect(result).toEqual(array);
    });

    it('should return null for corrupted data', () => {
      const storage = new Storage('local');
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      localStorage.setItem('corrupted', 'not-valid-json{');

      const result = storage.get('corrupted');

      expect(result).toBeNull();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to parse item from storage: corrupted',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('sessionStorage', () => {
    it('should store and retrieve a value from sessionStorage', () => {
      const storage = new Storage('session');

      storage.set('key', 'value');
      const result = storage.get<string>('key');

      expect(result).toBe('value');
      expect(sessionStorage.getItem('key')).toBe(JSON.stringify('value'));
    });

    it('should remove a value from sessionStorage', () => {
      const storage = new Storage('session');

      storage.set('key', 'value');
      storage.remove('key');

      expect(storage.get('key')).toBeNull();
      expect(sessionStorage.getItem('key')).toBeNull();
    });

    it('should clear sessionStorage', () => {
      const storage = new Storage('session');

      storage.set('key1', 'value1');
      storage.set('key2', 'value2');

      storage.clear();

      expect(sessionStorage.length).toBe(0);
    });

    it('should use prefix with sessionStorage', () => {
      const storage = new Storage('session', 'test');

      storage.set('key', 'value');

      expect(sessionStorage.getItem('test:key')).toBe(JSON.stringify('value'));
    });
  });

  describe('prefix isolation', () => {
    it('should isolate keys with different prefixes', () => {
      const storage1 = new Storage('local', 'app1');
      const storage2 = new Storage('local', 'app2');

      storage1.set('key', 'value1');
      storage2.set('key', 'value2');

      expect(storage1.get('key')).toBe('value1');
      expect(storage2.get('key')).toBe('value2');
    });

    it('should not interfere with unprefixed storage', () => {
      const prefixedStorage = new Storage('local', 'prefix');
      const unprefixedStorage = new Storage('local');

      prefixedStorage.set('key', 'prefixed-value');
      unprefixedStorage.set('key', 'unprefixed-value');

      expect(prefixedStorage.get('key')).toBe('prefixed-value');
      expect(unprefixedStorage.get('key')).toBe('unprefixed-value');
    });
  });
});
