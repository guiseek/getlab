import {Component} from '@angular/core'
import {TeamStore} from '../../../shared/store'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamTableComponent {
  displayedColumns = ['id', 'name', 'team']

  constructor(readonly teamStore: TeamStore) {}
}
