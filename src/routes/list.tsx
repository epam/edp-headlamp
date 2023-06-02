import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../components/ErrorBoundary';
import { EDPCDPipelineDetails } from '../pages/edp-cdpipeline-details';
import { EDPCDPipelineList } from '../pages/edp-cdpipeline-list';
import { EDPComponentDetails } from '../pages/edp-component-details';
import { EDPComponentList } from '../pages/edp-component-list';
import { EDPGitServerDetails } from '../pages/edp-gitserver-details';
import { EDPGitServerList } from '../pages/edp-gitserver-list';
import { EDPOverviewList } from '../pages/edp-overview-list';
import { React } from '../plugin.globals';
import {
    createRouteName,
    createRouteNameBasedOnNameAndNamespace,
} from '../utils/routes/createRouteName';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
    CDPIPELINE_ROUTE_NAME,
    CDPIPELINES_ROUTE_NAME,
    COMPONENT_ROUTE_NAME,
    COMPONENTS_ROUTE_NAME,
    GIT_SERVER_ROUTE_NAME,
    GIT_SERVERS_ROUTE_NAME,
    OVERVIEW_ROUTE_NAME,
} from './names';

const WrappedRoute: React.FC = ({ children }): React.ReactElement => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </QueryClientProvider>
    );
};

export const List: {
    [routeName: string]: any;
} = {
    [COMPONENTS_ROUTE_NAME]: {
        name: 'EDP Components',
        path: createRouteName(COMPONENTS_ROUTE_NAME),
        sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
        exact: true,
        component: () => (
            <WrappedRoute>
                <EDPComponentList />
            </WrappedRoute>
        ),
    },
    [COMPONENT_ROUTE_NAME]: {
        name: 'EDP Component',
        path: createRouteNameBasedOnNameAndNamespace(COMPONENTS_ROUTE_NAME),
        sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
        component: () => (
            <WrappedRoute>
                <EDPComponentDetails />
            </WrappedRoute>
        ),
    },
    [OVERVIEW_ROUTE_NAME]: {
        name: 'EDP Overview',
        path: createRouteName(OVERVIEW_ROUTE_NAME),
        sidebar: createSidebarItemName(OVERVIEW_ROUTE_NAME),
        exact: true,
        component: () => (
            <WrappedRoute>
                <EDPOverviewList />
            </WrappedRoute>
        ),
    },
    [CDPIPELINES_ROUTE_NAME]: {
        name: 'EDP CD Pipelines',
        path: createRouteName(CDPIPELINES_ROUTE_NAME),
        sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
        exact: true,
        component: () => (
            <WrappedRoute>
                <EDPCDPipelineList />
            </WrappedRoute>
        ),
    },
    [CDPIPELINE_ROUTE_NAME]: {
        name: 'EDP CD Pipeline',
        path: createRouteNameBasedOnNameAndNamespace(CDPIPELINES_ROUTE_NAME),
        sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
        component: () => (
            <WrappedRoute>
                <EDPCDPipelineDetails />
            </WrappedRoute>
        ),
    },
    [GIT_SERVERS_ROUTE_NAME]: {
        name: 'EDP CD Pipelines',
        path: createRouteName(GIT_SERVERS_ROUTE_NAME),
        sidebar: createSidebarItemName(GIT_SERVERS_ROUTE_NAME),
        exact: true,
        component: () => (
            <WrappedRoute>
                <EDPGitServerList />
            </WrappedRoute>
        ),
    },
    [GIT_SERVER_ROUTE_NAME]: {
        name: 'EDP CD Pipelines',
        path: createRouteNameBasedOnNameAndNamespace(GIT_SERVERS_ROUTE_NAME),
        sidebar: createSidebarItemName(GIT_SERVERS_ROUTE_NAME),
        exact: true,
        component: () => (
            <WrappedRoute>
                <EDPGitServerDetails />
            </WrappedRoute>
        ),
    },
};
