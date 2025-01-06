import { MonitoringURLService } from './index';

describe('testing link-creation MonitoringURLService', () => {
  it('should successfully create grafana url based on given baseURL and namespace params', () => {
    expect(
      MonitoringURLService.createDashboardLink(
        'grafana',
        'https://grafana-test.com',
        'test-namespace',
        'light'
      )
    ).toEqual(
      'https://grafana-test.com/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=test-namespace&theme=light'
    );
  });
  it('should successfully return base url if provider is unknown', () => {
    expect(
      MonitoringURLService.createDashboardLink(
        'some-provider',
        'https://grafana-test.com',
        'test-namespace',
        'light'
      )
    ).toEqual('https://grafana-test.com');
  });
});
