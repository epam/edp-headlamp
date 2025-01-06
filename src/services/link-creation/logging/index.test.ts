import { LoggingURLService } from './index';

describe('testing link-creation LoggingURLService', () => {
  it('should successfully create OpenSearch url based on given baseURL and namespace params', () => {
    expect(
      LoggingURLService.createDashboardLink(
        'opensearch',
        'https://kibana-test.com',
        'test-namespace'
      )
    ).toEqual(
      "https://kibana-test.com/app/discover#/?_g=()&_a=(columns:!(log),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes.namespace_name,negate:!f,params:(query:test-namespace),type:phrase),query:(match_phrase:(kubernetes.namespace_name:test-namespace)))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
    );
  });

  it('should successfully return baseURL if provider is unknown', () => {
    expect(
      LoggingURLService.createDashboardLink(
        'some-provider',
        'https://kibana-test.com',
        'test-namespace'
      )
    ).toEqual('https://kibana-test.com');
  });
});
