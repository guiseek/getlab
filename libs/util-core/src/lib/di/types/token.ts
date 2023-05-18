export class Token<T = unknown> {
  constructor(public name: string | T) {}
}
