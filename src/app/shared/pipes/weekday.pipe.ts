import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'weekday'})
export class WeekdayPipe implements PipeTransform {
  #weekdays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]

  transform(day: number) {
    return this.#weekdays[day]
  }
}
