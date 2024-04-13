import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth-interceptor';


bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule, AppRoutingModule),
      provideHttpClient(withInterceptorsFromDi()),
      {provide: 'DOMAIN_NAME', useValue: 'http://localhost:8000/api'},
      // {provide: 'DOMAIN_NAME', useValue: 'https://mlaapi.mitiget.com/api'},
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ]
})
  .catch(err => console.error(err));
