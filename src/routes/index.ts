import { routeEDPCDPipelineDetails } from '../pages/edp-cdpipeline-details/route';
import { routeEDPCDPipelineList } from '../pages/edp-cdpipeline-list/route';
import { routeEDPClusterList } from '../pages/edp-cluster-list/route';
import { routeEDPComponentDetails } from '../pages/edp-component-details/route';
import { routeEDPComponentList } from '../pages/edp-component-list/route';
import { routeEDPConfiguration } from '../pages/edp-configuration-list/route';
import { routeEDPGitServerList } from '../pages/edp-gitserver-list/route';
import { routeEDPMarketplace } from '../pages/edp-marketplace/route';
import { routeEDPNexusIntegration } from '../pages/edp-nexus-integration/route';
import { routeEDPOverviewList } from '../pages/edp-overview-list/route';
import { routeEDPRegistryList } from '../pages/edp-registry-list/route';
import { routeEDPSonarIntegration } from '../pages/edp-sonar-integration/route';
import { routeEDPStageDetails } from '../pages/edp-stage-details/route';

export default [
    // Overview
    routeEDPOverviewList,

    // Components & children
    routeEDPComponentList,
    routeEDPComponentDetails,

    // CD Pipelines & children
    routeEDPCDPipelineList,
    routeEDPCDPipelineDetails,
    routeEDPStageDetails,

    // Configuration(Git Servers & children, Clusters & children)

    routeEDPConfiguration,

    routeEDPClusterList,

    routeEDPGitServerList,

    routeEDPRegistryList,
    routeEDPSonarIntegration,
    routeEDPNexusIntegration,

    // Marketplace

    routeEDPMarketplace,
];
