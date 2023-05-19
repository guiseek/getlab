import { Provider, ProviderKey, Type, Token } from './types';

const di = () => {
  const container = new Map();
  const relations = new Map();

  const get = <T>(type: ProviderKey<T>): T => {
    const concrete = container.get(type);
    if (!concrete) throw `${type.name} não registrado`;
    return concrete;
  };

  const set = <T>({ for: key, use, add = [] }: Provider<T>) => {
    relations.set(key, add.map(get));

    if (key instanceof Token) {
      container.set(key, use);
      return;
    }

    if (typeof use === 'function') {
      const clazz = use as Type<typeof use>;
      const dependencies = relations.get(key);
      const instance = new clazz(...dependencies);

      if (instance instanceof use) {
        container.set(key, instance);
      }
    }
  };

  const providerList: Provider[] = [];

  const register = (...providers: Provider[]) => {
    providerList.push(...providers);
    providers.forEach(set);
  };

  const transfer = () => {
    return providerList.map(({ for: provide, use, add: deps = [] }) => {
      const useKey = provide instanceof Token ? 'useValue' : 'useClass';
      return { provide, deps, [useKey]: use };
    });
  };

  return { get, set, register, transfer };
};

export default di();
