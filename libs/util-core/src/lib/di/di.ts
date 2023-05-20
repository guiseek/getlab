import type { Type, UseAs, Provider, ProviderKey, ProviderItem } from './types';

const container = new Map();
const relations = new Map();
const providers: ProviderItem[] = [];

export const inject = <T>(type: ProviderKey<T>): T => {
  const concrete = container.get(type);
  if (!concrete) throw `Provider ${type.name} não registrado`;
  return concrete;
};

const instantiate = <T>({ for: key, use }: Provider<T>) => {
  let useAs: UseAs;

  if (typeof use === 'function') {
    const dependencies = relations.get(key);
    try {
      useAs = 'useClass';
      const clazz = use as Type<typeof use>;
      const instance = new clazz(...dependencies) as T;
      return { instance, useAs };
    } catch {
      useAs = 'useFactory';
      const factory = use as (...params: unknown[]) => any;
      const instance = factory(...dependencies);
      return { instance, useAs };
    }
  }

  useAs = 'useValue';
  return { instance: use as T, useAs };
};

const set = <T>(provider: Provider<T>) => {
  relations.set(provider.for, (provider.add ?? []).map(inject));
  const { instance, useAs } = instantiate(provider);
  container.set(provider.for, instance);
  providers.push({ ...provider, useAs });
};

export const register = (...providers: Provider[]) => providers.forEach(set);

export const transfer = () => {
  return providers.map(({ for: provide, use, add: deps = [], useAs }) => {
    return { provide, deps, [useAs]: use };
  });
};

export default { inject, register, transfer };
