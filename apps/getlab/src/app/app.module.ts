import { providers } from '@getlab/data-access';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NgModule } from '@angular/core';

providers.infrastructure()
providers.useCases()
providers.application()

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [providers.transfer()],
  bootstrap: [AppComponent],
})
export class AppModule {}
