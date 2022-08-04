import * as ApiProxy from './K8s/apiProxy';
import * as cluster from './K8s/cluster';

const noop = () => {};
const Utils = {
    useFilterFunc: noop,
};
const K8s = {
    ApiProxy,
    cluster,
};

export { ApiProxy, K8s, Utils };
