import type {
  Type,
  Provider,
  ProvidedAs,
  ProviderKey,
  ProviderItem,
} from './types';

const container = new Map();
const relations = new Map();
const providers: ProviderItem[] = [];

export const inject = <T>(type: ProviderKey<T>): T => {
  const concrete = container.get(type);
  if (!concrete) throw `Provider ${type.name} não registrado`;
  return concrete;
};

const provide = <T>({ for: key, use }: Provider<T>): ProvidedAs<T> => {
  const concrete = use ?? key;
  if (typeof concrete === 'function') {
    const dependencies = relations.get(key);
    try {
      const clazz = concrete as Type<typeof use>;
      const provided = new clazz(...dependencies) as T;
      return { provided, useAs: 'useClass' };
    } catch {
      const factory = concrete as <R>(...params: unknown[]) => R;
      const provided = factory<T>(...dependencies);
      return { provided, useAs: 'useFactory' };
    }
  }

  return { provided: concrete as T, useAs: 'useValue' };
};

const set = <T>(provider: Provider<T>) => {
  relations.set(provider.for, (provider.add ?? []).map(inject));
  const { provided, useAs } = provide(provider);
  container.set(provider.for, provided);
  providers.push({ ...provider, useAs });
};

export const register = (...providers: Provider[]) => providers.forEach(set);

export const transfer = () => {
  return providers.map(({ for: provide, use, add: deps = [], useAs }) => {
    return { provide, deps, [useAs]: use };
  });
};

export default { inject, register, transfer };
