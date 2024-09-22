import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor, AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:7130',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'AngularExampleAppFront',
        scope: 'WebApiExampleApp openid offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        secureRoutes: ['https://localhost:7144/', 'https://localhost:7072/'],
      },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor()]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
