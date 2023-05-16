import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './shared/material.module'
import {PreviewComponent} from './pages/preview/preview.component'
import {TeamFormComponent, ScheduleComponent} from './components/forms'
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import {TeamTableComponent, ScheduleTableComponent} from './components/tables'
import {appProvideres} from './app.providers'
import {AppComponent} from './app.component'
import {WeekdayPipe} from './shared/pipes'
import {appRoutes} from './app.routes'
import {AppShell} from './app.shell'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'

@NgModule({
  declarations: [
    AppShell,
    AppComponent,
    DashboardComponent,
    ScheduleComponent,
    PreviewComponent,
    TeamFormComponent,
    TeamTableComponent,
    ScheduleTableComponent,
    WeekdayPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledNonBlocking',
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [appProvideres()],
  bootstrap: [AppComponent],
})
export class AppModule {}
