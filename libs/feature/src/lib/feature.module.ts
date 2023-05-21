import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { register } from '@getlab/util-core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_MODULES } from './material-modules';
import { FeatureComponent } from './feature.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { featureRoutes } from './feature.routes';
import {
  CONFIRM_DIALOG,
  ConfirmDialogComponent,
  SidenavMenuComponent,
} from './components';
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
    SidenavMenuComponent,
    SpreadsheetContainer,
    ConfirmDialogComponent,
  ],
})
export class FeatureModule {
  constructor(readonly matDialog: MatDialog) {
    register({ for: CONFIRM_DIALOG, use: matDialog });
  }
}
