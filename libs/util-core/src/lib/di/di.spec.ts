import { Token } from './types';
import di from './di';

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

di.register(
  {
    for: NAME_TOKEN,
    use: 'team',
  },
  {
    for: Abstraction,
    use: ConcreteImpl,
    add: [NAME_TOKEN],
  }
);

describe('Util Core', () => {
  it('token should be team', () => {
    const name = di.get(NAME_TOKEN);
    expect(name).toEqual('team');
  });

  it('abstraction should be concrete impl', () => {
    const abstraction = di.get(Abstraction);
    expect(abstraction).toBeInstanceOf(ConcreteImpl);
  });

  it('abstraction name should be team', () => {
    const abstraction = di.get(Abstraction);
    expect(abstraction.name).toEqual('team');
  });
});
