import { Component } from '@angular/core';
import { ScheduleFacade, TeamFacade } from '@getlab/data-access';

@Component({
  selector: 'getlab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    readonly facade: TeamFacade,
    readonly scheduleFacade: ScheduleFacade,
  ) {}
}
