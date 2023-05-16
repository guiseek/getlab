import {Component} from '@angular/core'
import {TeamStore} from '../../../shared/store'

@Component({
  selector: 'app-team',
  templateUrl: './schedule.component.html',
})
export class ScheduleTableComponent {
  displayedColumns = ['id', 'name', 'team']

  // constructor(readonly teamStore: TeamStore) {}
}
