import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MATERIAL_MODULES} from './shared/material-modules'
import {PreviewComponent} from './pages/preview/preview.component'
import {TeamFormComponent, ScheduleComponent} from './components/forms'
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import {TeamTableComponent} from './components/tables'
import {GoalPipe, WeekdayPipe} from './shared/pipes'
import {appProvideres} from './app.providers'
import {AppComponent} from './app.component'
import {appRoutes} from './app.routes'
import {AppShell} from './app.shell'

@NgModule({
  declarations: [
    AppShell,
    AppComponent,
    DashboardComponent,
    ScheduleComponent,
    PreviewComponent,
    TeamFormComponent,
    TeamTableComponent,
    WeekdayPipe,
    GoalPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledNonBlocking',
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MATERIAL_MODULES
  ],
  providers: [appProvideres()],
  bootstrap: [AppComponent],
})
export class AppModule {}
