# Getlab

## Injeção de dependências
Como registrar suas dependências, direcionando responsabilidades

### Simples
Classe sem dependência nem substituto concreto

```ts
import { register } from '@getlab/util-core';

class MeuService {}

register({ for: MeuService });
```

### Com dependência
Classe contendo uma dependência

Veja que primeiro registramos `DependenciaDoMeuService`, em seguida registramos `MeuServiceComDependencia` indicando para adicionar `DependenciaDoMeuService`, pois ela depende dele pra funcionar corretamente.

```ts
import { register } from '@getlab/util-core';

class DependenciaDoMeuService {}

class MeuServiceComDependencia {
  constructor(dependenciaDoMeuService: DependenciaDoMeuService) {}
}

register(
  { for: DependenciaDoMeuService },
  {
    for: MeuServiceComDependencia,
    add: [DependenciaDoMeuService],
  }
);
```

### Direcionando responsabilidade
Classe abstrata e classe concreta
Primeiro criamos uma abstração sem implementação, desta forma:

```ts
abstract class MeuServiceAbstrato<P, R> {
  abstract executa(value: P): R;
}
```

Em seguida, criamos a classe concreta, que implementa o contrato da abstração:

```ts
class MeuServiceConcreto implements MeuServiceAbstrato<string, string> {
  executa(value: string): string {
    return value + ' executado';
  }
}
```

Agora registramos uma, indicando a outra como responsável de implementação

```ts
import { register } from '@getlab/util-core';

register({
  for: MeuServiceAbstrato,
  use: MeuServiceConcreto,
});
```

### Direcionando responsabilidade com dependências
Classe abstrata e classe concreta que depende de outras classes
Em seguida, criamos a classe concreta, que implementa o contrato da abstração:

```ts
abstract class MeuOutroService {
  abstract executa(value: string): string;
}

class MeuOutroServiceImpl implements MeuOutroService {
  constructor(private service: MeuServiceAbstrato) {}

  executa(value) {
    return this.service.execute(value);
  }
}
```

Agora registramos uma, indicando a outra como responsável de implementação e pedindo que a dependência dela seja injetada no construtor da responsável de implementação, pois é uma dependência para o funcionamento.

```ts
import { register, inject } from '@getlab/util-core';

register({
  for: MeuOutroService,
  use: MeuOutroServiceImpl,
  add: [MeuServiceAbstrato],
});

const meuOutroServico = inject(MeuOutroService);
```

# Exemplos reais

## Organizando
UseCases precisam da infra registrada e Facades precisas dos UseCases registrados, então precisamos começar registradno a infra

```ts
import { register, transfer, inject } from '@getlab/util-core';

export const providers = {
  infrastructure() {
    register({
      for: TeamRepository,
      use: TeamHttpRepositoryImpl,
    });
  },
  useCases() {
    register({
      for: CreateTeamUseCase,
      use: CreateTeamUseCase,
      add: [TeamRepository],
    });
  },
  application() {
    register({
      for: TeamFacade,
      use: TeamFacade,
      add: [
        CreateTeamUseCase,
        // ...
      ],
    });
  },
  transfer() {
    return transfer();
  },
};

providers.infrastructure();
providers.useCases();
providers.application();

const teamFacade = inject(TeamFacade);
```

## Usando

```ts
import { inject } from '@getlab/util-core';
```

## Transferindo

```ts
import { transfer, inject } from '@getlab/util-core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'getlab-root',
  providers: [ transfer() ],
  template: `
    <pre>
      {{ facade.data$ | async | json }}
    </pre>
  `,
})
export class AppComponent {
  facade = inject(TeamFacade)
}
```

---

Visit the [Nx Documentation](https://nx.dev) to learn more.
