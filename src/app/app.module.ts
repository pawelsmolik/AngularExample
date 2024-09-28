import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor, AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CompositePropagatorModule, OpenTelemetryHttpInterceptor, OpenTelemetryInterceptorModule, OTEL_INSTRUMENTATION_PLUGINS, OtelColExporterModule, OtelWebTracerModule, ZipkinExporterModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ZipkinExporterModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    OpenTelemetryInterceptorModule.forRoot(environment.openTelemetryConfig),
    //OtelColExporterModule,
    CompositePropagatorModule,
    OtelWebTracerModule.forRoot(environment.openTelemetryConfig),
    AuthModule.forRoot({
      config: {
        authority: environment.identityServerUrl,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'AngularExampleAppFront',
        scope: 'WebApiExampleApp openid offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        secureRoutes: ['https://localhost:7144/', 'https://localhost:7072/', environment.reverseProxyUrl],
      },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor()])),
    {provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
    OpenTelemetryHttpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
