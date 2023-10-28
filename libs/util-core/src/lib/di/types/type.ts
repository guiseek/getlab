interface Fn {
  readonly name: string;
}

export interface Type<T> extends Fn {
  new (...params: unknown[]): T;
}
