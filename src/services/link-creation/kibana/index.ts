export const KibanaURLService = {
  createDashboardLink: (kibanaURLOrigin: string, namespace: string) => {
    if (!kibanaURLOrigin) {
      return undefined;
    }

    return `${kibanaURLOrigin}/app/discover#/?_g=()&_a=(columns:!(log),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes.namespace_name,negate:!f,params:(query:${namespace}),type:phrase),query:(match_phrase:(kubernetes.namespace_name:${namespace})))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`;
  },
};
