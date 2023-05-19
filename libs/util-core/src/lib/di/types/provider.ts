import { AbstractType } from './abstract-type';
import { Token } from './token';
import { Type } from './type';

export type ProviderKey<T> = AbstractType<T> | Token<T>;
export type ProviderImpl<T> = T | Type<T> | Token<T>;

export interface Provider<T = unknown> {
  for: ProviderKey<T>;
  use: ProviderImpl<T>;
  add?: ProviderKey<T>[];
}
