import { EDPComponentsURLS } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';

export const createKibanaLink = (EDPComponentsURLS: EDPComponentsURLS, namespace: string) => {
    const kibanaURLOrigin = EDPComponentsURLS?.kibana;

    if (!kibanaURLOrigin) {
        return;
    }

    return `${kibanaURLOrigin}/app/discover#/?_g=()&_a=(columns:!(),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:${namespace}),type:phrase),query:(match_phrase:(kubernetes_namespace_name:${namespace})))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`;
};
