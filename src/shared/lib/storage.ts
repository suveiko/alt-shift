type StorageType = 'local' | 'session';

class Storage {
  private storage: globalThis.Storage;
  private prefix: string;

  constructor(type: StorageType, prefix = '') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
    this.prefix = prefix;
  }

  private key(k: string): string {
    return this.prefix ? `${this.prefix}:${k}` : k;
  }

  get<T>(k: string): Nullable<T> {
    const item = this.storage.getItem(this.key(k));

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to parse item from storage: ${k}`, error);

      return null;
    }
  }

  set<T>(k: string, value: T): void {
    this.storage.setItem(this.key(k), JSON.stringify(value));
  }

  remove(k: string): void {
    this.storage.removeItem(this.key(k));
  }

  clear(): void {
    this.storage.clear();
  }
}

export { Storage };
