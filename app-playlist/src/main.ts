import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(FormsModule)
  ]
});
