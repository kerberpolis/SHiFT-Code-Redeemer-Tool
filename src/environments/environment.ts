import { environment as baseEnvironment } from './environment.base';

export const environment = { 
  ...baseEnvironment,
  apiBaseUrl: 'http://0.0.0.0:8080/borderlands-code-crawler/v1'
};
