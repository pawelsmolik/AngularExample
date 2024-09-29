import { DiagLogLevel } from '@opentelemetry/api';
import {
  OpenTelemetryConfig
} from '@jufab/opentelemetry-angular-interceptor';

interface IEnvironment {
  production: boolean;
  openTelemetryEnable: boolean;
  openTelemetryConfig: OpenTelemetryConfig;
  authOptions: AuthOptions;
  reverseProxyUrl: string;
}

interface AuthOptions {
  authority: string,
  clientId: string,
  secureRoutes: string[]
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: true,
  openTelemetryEnable: true,
  openTelemetryConfig: {
    commonConfig: {
      console: true, // Display trace on console
      production: true, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'Angularexample', // Service name send in trace
      probabilitySampler: '1', // 75% sampling
      logLevel: DiagLogLevel.ALL //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    zipkinConfig: {
      url: 'http://localhost:9411/api/v2/spans'
    },
    b3PropagatorConfig: {
      multiHeader: '0' //Value : 'O' (single), '1' (multi)
    },
    otelcolConfig: {
        url: 'http://localhost:4318/v1/traces', //URL of opentelemetry collector
    },
  },
  authOptions: {
    authority: 'https://localhost:7130',
    clientId: 'AngularExampleAppFront',
    secureRoutes: ['https://localhost:7144/', 'https://localhost:7072/']
  },
  reverseProxyUrl: 'https://localhost:7072'
};