import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { MONITORING_PROVIDERS } from '../../../k8s/groups/EDP/QuickLink/constants';
import { MonitoringURLService } from './index';

describe('testing link-creation MonitoringURLService', () => {
  it('should successfully create grafana url based on given baseURL and namespace params', () => {
    expect(
      MonitoringURLService.createDashboardLink({
        provider: MONITORING_PROVIDERS.GRAFANA,
        baseURL: 'https://grafana-test.com',
        namespace: 'test-namespace',
      })
    ).toEqual(
      'https://grafana-test.com/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=test-namespace&theme=light'
    );
  });
  it('should successfully create datadog url based on given baseURL and namespace params', () => {
    jest.spyOn(Utils, 'getCluster').mockReturnValue('test-cluster-name');

    expect(
      MonitoringURLService.createDashboardLink({
        provider: MONITORING_PROVIDERS.DATADOG,
        baseURL: 'https://datadog-test.com',
        namespace: 'test-namespace',
      })
    ).toEqual(
      'https://datadog-test.com/dash/integration/Kubernetes%20-%20Pods?tpl_var_cluster=test-cluster-name&tpl_var_namespace=test-namespace'
    );
  });
  it('should successfully return base url if provider is unknown', () => {
    expect(
      MonitoringURLService.createDashboardLink({
        provider: 'some-unknown-provider',
        baseURL: 'https://test.com',
        namespace: 'test-namespace',
      })
    ).toEqual('https://test.com');
  });
});
