import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from './material-modules';
import { featureRoutes } from './feature.routes';
import { FeatureComponent } from './feature.component';
import { TeamContainer } from './containers/team/team.container';
import { ScheduleContainer } from './containers/schedule/schedule.container';
import { ReactiveFormsModule } from '@angular/forms';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { SpreadsheetContainer } from './containers/spreadsheet/spreadsheet.container';

@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterModule.forChild(featureRoutes),
  ],
  declarations: [
    FeatureComponent,
    TeamContainer,
    ScheduleContainer,
    WeekdayPipe,
    SpreadsheetContainer,
  ],
})
export class FeatureModule {}
