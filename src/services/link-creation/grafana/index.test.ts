import { GrafanaURLService } from './index';

describe('testing link-creation GrafanaURLService', () => {
  it('should successfully create grafana url based on given grafanaURLOrigin and namespace params', () => {
    expect(
      GrafanaURLService.createDashboardLink('https://grafana-test.com', 'test-namespace')
    ).toEqual(
      'https://grafana-test.com/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=test-namespace'
    );
  });
});
