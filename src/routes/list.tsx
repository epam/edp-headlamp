import { EDPCodebaseKubeObjectConfig } from '../k8s/EDPCodebase/config';
import { EDPComponentKubeObjectConfig } from '../k8s/EDPComponent/config';
import { EDPApplication } from '../pages/edp-application';
import { EDPApplications } from '../pages/edp-applications';
import { EDPComponents } from '../pages/edp-components';
import { createRouteItemName } from '../utils/routes/createRouteItemName';
import { createSidebarRouteURLBasedOnName } from '../utils/routes/createSidebarRouteURLBasedOnName';

const {
    pluginLib: { React },
} = window;

export const List: {
    [routeName: string]: any;
} = {
    codebases: {
        name: 'EDP Codebases',
        path: createSidebarRouteURLBasedOnName(EDPCodebaseKubeObjectConfig.name.pluralForm),
        sidebar: createRouteItemName(EDPCodebaseKubeObjectConfig.name.pluralForm),
        exact: true,
        component: () => <EDPApplications />,
    },
    codebase: {
        name: 'EDP Codebase',
        path: '/edp/codebases/:namespace/:name',
        sidebar: createRouteItemName(EDPCodebaseKubeObjectConfig.name.pluralForm),
        component: () => <EDPApplication />,
    },
    components: {
        name: 'EDP Components',
        path: createSidebarRouteURLBasedOnName(EDPComponentKubeObjectConfig.name.pluralForm),
        sidebar: createRouteItemName(EDPComponentKubeObjectConfig.name.pluralForm),
        exact: true,
        component: () => <EDPComponents />,
    },
};
