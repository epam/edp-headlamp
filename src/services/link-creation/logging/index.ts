export const LoggingURLService = {
  createDashboardLink: ({
    provider,
    baseURL,
    namespace,
    clusterName,
  }: {
    provider: string | undefined;
    baseURL: string | undefined;
    namespace: string;
    clusterName?: string;
  }) => {
    if (!baseURL) {
      return undefined;
    }

    switch (provider) {
      case 'opensearch': {
        return `${baseURL}/app/discover#/?_g=()&_a=(columns:!(log),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes.namespace_name,negate:!f,params:(query:${namespace}),type:phrase),query:(match_phrase:(kubernetes.namespace_name:${namespace})))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`;
      }
      case 'datadog': {
        return `${baseURL}/logs?query=cluster_name%3A${clusterName}%20kube_namespace%3A${namespace}`;
      }
      default: {
        return baseURL;
      }
    }
  },
};
