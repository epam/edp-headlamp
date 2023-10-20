import * as ApiProxy from './K8s/apiProxy';
import * as cluster from './K8s/cluster';

const noop = () => {};

const Utils = {
    useFilterFunc: noop,
    getCluster: noop,
};

const Router = {
    createRouteURL: () => 'test',
};

class Resource {
    apiEndpoint: {
        post: () => {};
        delete: () => {};
    };
}

const K8s = {
    ApiProxy,
    cluster,
    secret: {
        default: Resource,
    },
    serviceAccount: {
        default: Resource,
    },
    configMap: {
        default: Resource,
    },
};

export { ApiProxy, K8s, Utils, Router };
