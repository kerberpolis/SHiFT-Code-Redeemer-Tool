import { environment as baseEnvironment } from './environment.base';

export const environment = { 
  ...baseEnvironment,
  apiBaseUrl: 'http://localhost:8080/borderlands-code-crawler/v1'
};
