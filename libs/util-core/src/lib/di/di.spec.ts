import { inject, register } from './di';
import { Token } from './types';

const NAME_TOKEN = new Token('name');

abstract class Abstraction {
  abstract get name(): string;
}
class ConcreteImpl implements Abstraction {
  get name() {
    return this._name;
  }
  constructor(private _name: string) {}
}

const FACTORY_TOKEN = new Token<Abstraction>('factory');

class DirectImpl {
  constructor(public abstraction: Abstraction) {}
}

register(
  {
    for: NAME_TOKEN,
    use: 'team',
  },
  {
    for: Abstraction,
    use: ConcreteImpl,
    add: [NAME_TOKEN],
  },
  {
    for: FACTORY_TOKEN,
    use: (name: string) => {
      return new ConcreteImpl(name);
    },
    add: [NAME_TOKEN],
  },
  {
    for: DirectImpl,
    add: [Abstraction],
  }
);

describe('Util Core', () => {
  it('token should be team', () => {
    const name = inject(NAME_TOKEN);
    expect(name).toEqual('team');
  });

  it('abstraction should be concrete impl', () => {
    const abstraction = inject(Abstraction);
    expect(abstraction).toBeInstanceOf(ConcreteImpl);
  });

  it('abstraction name should be team', () => {
    const abstraction = inject(Abstraction);
    expect(abstraction.name).toEqual('team');
  });

  it('factory fn should be called with name team', () => {
    const abstraction = inject(FACTORY_TOKEN);
    expect(abstraction.name).toEqual('team');
  });

  it('direct impl should directImpl instance', () => {
    const directImpl = inject(DirectImpl);
    expect(directImpl).toBeInstanceOf(DirectImpl);
  });

  it('direct impl should has abstraction', () => {
    const directImpl = inject(DirectImpl);
    expect(directImpl.abstraction).toBeInstanceOf(ConcreteImpl);
  });
});
