import { pluginLib, ReactRedux, ReactRouter } from '../../../plugin.globals';
import type { Router } from '../../../plugin.types';
import routes from '../../../routes';
import { RouteURLProps } from '../../../routes/types';

const { Utils } = pluginLib;

type HeadlampState = {
    ui: {
        routes: {
            [path: string]: Router.Route;
        };
    };
};

export function useMemoizedCreateRouteURL(routeName: string, params: RouteURLProps = {}) {
    const store = ReactRedux.useStore<HeadlampState>();
    const storeRoutes = store.getState().ui.routes;
    const route = (storeRoutes && storeRoutes[routeName]) || routes[routeName];

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

export function createRouteURL(routeName: string, params: RouteURLProps = {}) {
    const route = routes[routeName];

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
