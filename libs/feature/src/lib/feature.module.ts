import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from './material-modules';
import { FeatureComponent } from './feature.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { featureRoutes } from './feature.routes';
import { CONFIRM_DIALOG, ConfirmDialogComponent } from './components';
import { MatDialog } from '@angular/material/dialog';
import { register } from '@getlab/util-core';
import {
  TeamContainer,
  ScheduleContainer,
  SpreadsheetContainer,
} from './containers';

@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterModule.forChild(featureRoutes),
  ],
  declarations: [
    WeekdayPipe,
    TeamContainer,
    FeatureComponent,
    ScheduleContainer,
    SpreadsheetContainer,
    ConfirmDialogComponent,
  ],
})
export class FeatureModule {
  constructor(readonly matDialog: MatDialog) {
    register({ for: CONFIRM_DIALOG, use: matDialog });
  }
}
