import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createScriptTag } from './app/app.analytics';
import { AppModule } from './app/app.module';
import { env } from './envs/env';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if (env.production && env.ga) {
      createScriptTag(env.ga);
    }
  })
  .catch((err) => console.error(err));
