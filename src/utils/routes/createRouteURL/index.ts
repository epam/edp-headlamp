import { Route } from '@kinvolk/headlamp-plugin/lib/lib/router';
import { getCluster, getClusterPrefixedPath } from '@kinvolk/headlamp-plugin/lib/lib/util';
import { useStore } from 'react-redux';
import { generatePath } from 'react-router-dom';
import routes from '../../../routes';
import { RouteURLProps } from '../../../routes/types';

type HeadlampState = {
    ui: {
        routes: {
            [path: string]: Route;
        };
    };
};

export function useMemoizedCreateRouteURL(routeName: string, params: RouteURLProps = {}) {
    const store = useStore<HeadlampState>();
    const storeRoutes = store.getState().ui.routes;
    const route = (storeRoutes && storeRoutes[routeName]) || routes[routeName];

    if (!route) {
        return '';
    }

    let cluster: string | null = null;
    if (!route.noCluster) {
        cluster = getCluster();
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

    const url = getClusterPrefixedPath(route.path);
    return generatePath(url, fullParams);
}

export function createRouteURL(routeName: string, params: RouteURLProps = {}) {
    const route = routes[routeName];

    if (!route) {
        return '';
    }

    let cluster: string | null = null;
    if (!route.noCluster) {
        cluster = getCluster();
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

    const url = getClusterPrefixedPath(route.path);
    return generatePath(url, fullParams);
}
