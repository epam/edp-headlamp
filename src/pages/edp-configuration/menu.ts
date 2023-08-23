import { PageDescription } from '../../types/pages';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './pages/edp-cluster-list/constants';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-defect-dojo-integration/constants';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-dependency-track-integration/constants';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './pages/edp-gitserver-list/constants';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-jira-integration/constants';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-nexus-integration/constants';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './pages/edp-registry-list/constants';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-sonar-integration/constants';

export const menu: PageDescription[] = [
    GIT_SERVER_LIST_PAGE_DESCRIPTION,
    CLUSTER_LIST_PAGE_DESCRIPTION,
    REGISTRY_LIST_PAGE_DESCRIPTION,
    SONAR_INTEGRATION_PAGE_DESCRIPTION,
    NEXUS_INTEGRATION_PAGE_DESCRIPTION,
    DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION,
    DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION,
    JIRA_INTEGRATION_PAGE_DESCRIPTION,
];
