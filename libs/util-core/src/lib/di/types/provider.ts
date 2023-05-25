import { AbstractType } from './abstract-type';
import { Token } from './token';
import { Type } from './type';

export type ProviderKey<T> = AbstractType<T> | Token<T>;
export type ProviderImpl<T> = T | Type<T>;

export interface Provider<T = unknown> {
  for: ProviderKey<T>;
  use?: ProviderImpl<T>;
  add?: ProviderKey<T>[];
}

export type UseAs = 'useValue' | 'useClass' | 'useFactory';

export interface ProviderItem<T = unknown> extends Provider<T> {
  useAs: UseAs;
}

export interface ProvidedAs<T> {
  provided: ProviderImpl<T>;
  useAs: UseAs;
}
