import { ICONS } from '../../icons/iconify-icons-mapping';
import { PageDescription } from '../../types/pages';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './pages/edp-cluster-list/constants';
import { EDP_COMPONENT_LIST_PAGE_DESCRIPTION } from './pages/edp-component-list/constants';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-defect-dojo-integration/constants';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-dependency-track-integration/constants';
import { GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION } from './pages/edp-gitops/constants';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './pages/edp-gitserver-list/constants';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-jira-integration/constants';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-nexus-integration/constants';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './pages/edp-registry-list/constants';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-sonar-integration/constants';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-sso-integration/constants';

export interface SubMenuGroup {
    label: string;
    icon: string;
    children: PageDescription[];
}

export const menu: SubMenuGroup[] = [
    {
        label: 'Artifacts Storage',
        icon: ICONS.REGISTRY,
        children: [NEXUS_INTEGRATION_PAGE_DESCRIPTION, REGISTRY_LIST_PAGE_DESCRIPTION],
    },
    {
        label: 'Deployment',
        icon: ICONS.CLUSTERS,
        children: [CLUSTER_LIST_PAGE_DESCRIPTION, GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION],
    },
    {
        label: 'Security',
        icon: 'material-symbols:security',
        children: [
            DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION,
            DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION,
        ],
    },
    {
        label: 'Code Quality',
        icon: ICONS.SONAR,
        children: [SONAR_INTEGRATION_PAGE_DESCRIPTION],
    },
    {
        label: 'Version Control System',
        icon: ICONS.GIT,
        children: [GIT_SERVER_LIST_PAGE_DESCRIPTION],
    },
    {
        label: 'Management Tool',
        icon: ICONS.JIRA,
        children: [JIRA_INTEGRATION_PAGE_DESCRIPTION],
    },
    {
        label: null,
        icon: null,
        children: [EDP_COMPONENT_LIST_PAGE_DESCRIPTION, SSO_INTEGRATION_PAGE_DESCRIPTION],
    },
];
