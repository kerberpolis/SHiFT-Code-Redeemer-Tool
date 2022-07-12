import { environment as baseEnvironment } from './environment.base';

export const environment = {
  ...baseEnvironment,
  production: false,
  apiBaseUrl: 'http://ec2-18-134-135-182.eu-west-2.compute.amazonaws.com:8081/borderlands-code-crawler/v1',
};
