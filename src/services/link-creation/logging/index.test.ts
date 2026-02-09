import { LoggingURLService } from './index';

describe('testing link-creation LoggingURLService', () => {
  it('should successfully create OpenSearch url', () => {
    expect(
      LoggingURLService.createDashboardLink({
        provider: 'opensearch',
        baseURL: 'https://opensearch-test.com',
        namespace: 'test-namespace',
      })
    ).toEqual(
      "https://opensearch-test.com/app/discover#/?_g=()&_a=(columns:!(log),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes.namespace_name,negate:!f,params:(query:test-namespace),type:phrase),query:(match_phrase:(kubernetes.namespace_name:test-namespace)))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
    );
  });

  it('should successfully create Datadog url', () => {
    expect(
      LoggingURLService.createDashboardLink({
        provider: 'datadog',
        baseURL: 'https://datadog-test.com',
        namespace: 'test-namespace',
        clusterName: 'test-cluster-name',
      })
    ).toEqual(
      'https://datadog-test.com/logs?query=cluster_name%3Atest-cluster-name%20kube_namespace%3Atest-namespace'
    );
  });

  it('should successfully return baseURL if provider is unknown', () => {
    expect(
      LoggingURLService.createDashboardLink({
        provider: 'some-provider',
        baseURL: 'https://opensearch-test.com',
        namespace: 'test-namespace',
      })
    ).toEqual('https://opensearch-test.com');
  });
});
