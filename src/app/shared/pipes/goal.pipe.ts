import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'goal'})
export class GoalPipe implements PipeTransform {
  #goals = {
    dev: 'Desenvolvimento de software',
    research: 'Pesquisa',
  }

  transform(day: 'dev' | 'research') {
    return this.#goals[day]
  }
}
