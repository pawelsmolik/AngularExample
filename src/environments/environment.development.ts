import { DiagLogLevel } from '@opentelemetry/api';
import {
  OpenTelemetryConfig
} from '@jufab/opentelemetry-angular-interceptor';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  openTelemetryConfig: OpenTelemetryConfig;
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200',
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
  }
};