export const KibanaURLService = {
  createDashboardLink: (kibanaURLOrigin: string, namespace: string) => {
    if (!kibanaURLOrigin) {
      return undefined;
    }

    return `${kibanaURLOrigin}/app/discover#/?_g=()&_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:${namespace}),type:phrase),query:(match_phrase:(kubernetes_namespace_name:${namespace})))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`;
  },
};
