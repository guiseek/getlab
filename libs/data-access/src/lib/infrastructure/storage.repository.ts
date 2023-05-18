export class StorageRepository<T = unknown> {
  constructor(private storage: Storage, protected name: string) {}

  protected set data(value: T[]) {
    const data = JSON.stringify(value);
    this.storage.setItem(this.name, data);
  }

  protected get data(): T[] {
    const data = this.storage.getItem(this.name);
    const parsed = JSON.parse(data ?? '[]') as T[];
    if (parsed.length === 0) this.data = [];
    return parsed;
  }

  protected write(...value: T[]) {
    const data = this.data;
    this.data.push(...value);
    this.data = data;
  }

  protected rewrite(value: T[]) {
    this.data = value;
  }

  protected read() {
    return this.data;
  }
}
