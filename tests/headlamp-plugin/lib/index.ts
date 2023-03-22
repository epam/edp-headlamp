import * as ApiProxy from './K8s/apiProxy';
import * as cluster from './K8s/cluster';

const noop = () => {};
const Utils = {
    useFilterFunc: noop,
    getCluster: noop,
};

class Secret {
    static default = {
        apiEndpoint: {
            post: () => {},
            delete: () => {},
        },
    };
}

const K8s = {
    ApiProxy,
    cluster,
    secret: Secret,
};

export { ApiProxy, K8s, Utils };
