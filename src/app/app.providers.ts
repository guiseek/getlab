import {ScheduleService, TeamService} from './shared/services'
import {MAT_DATE_LOCALE} from '@angular/material/core'
import ptBR from '@angular/common/locales/extra/br'
import {registerLocaleData} from '@angular/common'
import pt from '@angular/common/locales/pt'
import {LOCALE_ID} from '@angular/core'
import {ScheduleStore, TeamStore} from './shared/store'

export const appProvideres = () => {
  registerLocaleData(pt, 'pt-BR', ptBR)

  return [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: ptBR,
    },
    {
      provide: Storage,
      useValue: localStorage,
    },
    {
      provide: TeamService,
      useClass: TeamService,
      deps: [Storage],
    },
    {
      provide: TeamStore,
      useClass: TeamStore,
      deps: [TeamService],
    },
    {
      provide: ScheduleService,
      useClass: ScheduleService,
      deps: [Storage],
    },
    {
      provide: ScheduleStore,
      useClass: ScheduleStore,
      deps: [ScheduleService],
    },
  ]
}
