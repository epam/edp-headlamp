export const MonitoringURLService = {
  createDashboardLink: (
    provider: string,
    baseURL: string,
    namespace: string,
    theme: string = localStorage.getItem('headlampThemePreference') || 'light'
  ) => {
    if (!baseURL) {
      return undefined;
    }

    switch (provider) {
      case 'grafana': {
        return `${baseURL}/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=${namespace}&theme=${theme}`;
      }
      default: {
        return baseURL;
      }
    }
  },
};
