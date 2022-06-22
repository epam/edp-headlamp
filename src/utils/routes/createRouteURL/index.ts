import { List } from '../../../routes';
import { RouteURLProps } from '../../../routes/types';

const {
    pluginLib: { Utils, ReactRouter, ReactRedux },
} = window;

export function createRouteURL(routeName: string, params: RouteURLProps = {}) {
    const store = ReactRedux.useStore();
    const storeRoutes = store.getState().ui.routes;
    const route = (storeRoutes && storeRoutes[routeName]) || List[routeName];

    if (!route) {
        return '';
    }

    let cluster: string | null = null;
    if (!route.noCluster) {
        cluster = Utils.getCluster();
        if (!cluster) {
            return '/';
        }
    }
    const fullParams = {
        ...params,
    };
    if (cluster) {
        fullParams.cluster = cluster;
    }

    const url = Utils.getClusterPrefixedPath(route.path);
    return ReactRouter.generatePath(url, fullParams);
}
