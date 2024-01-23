export const GrafanaURLService = {
  createDashboardLink: (grafanaURLOrigin: string, namespace: string) => {
    if (!grafanaURLOrigin) {
      return undefined;
    }

    return `${grafanaURLOrigin}/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=${namespace}`;
  },
};
