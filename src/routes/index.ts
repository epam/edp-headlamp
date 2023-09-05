import { routeEDPCDPipelineDetails } from '../pages/edp-cdpipeline-details/route';
import { routeEDPCDPipelineList } from '../pages/edp-cdpipeline-list/route';
import { routeEDPComponentDetails } from '../pages/edp-component-details/route';
import { routeEDPComponentList } from '../pages/edp-component-list/route';
import { routeEDPClusterList } from '../pages/edp-configuration/pages/edp-cluster-list/route';
import { routeEDPDefectDojoIntegration } from '../pages/edp-configuration/pages/edp-defect-dojo-integration/route';
import { routeEDPDependencyTrackIntegration } from '../pages/edp-configuration/pages/edp-dependency-track-integration/route';
import { routeEDPGitOpsConfiguration } from '../pages/edp-configuration/pages/edp-gitops/route';
import { routeEDPGitServerList } from '../pages/edp-configuration/pages/edp-gitserver-list/route';
import { routeEDPJiraIntegration } from '../pages/edp-configuration/pages/edp-jira-integration/route';
import { routeEDPNexusIntegration } from '../pages/edp-configuration/pages/edp-nexus-integration/route';
import { routeEDPRegistryList } from '../pages/edp-configuration/pages/edp-registry-list/route';
import { routeEDPSonarIntegration } from '../pages/edp-configuration/pages/edp-sonar-integration/route';
import { routeEDPMarketplace } from '../pages/edp-marketplace/route';
import { routeEDPOverviewList } from '../pages/edp-overview-list/route';
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

    // Configuration Group
    routeEDPClusterList,
    routeEDPGitServerList,
    routeEDPRegistryList,
    routeEDPSonarIntegration,
    routeEDPNexusIntegration,
    routeEDPDefectDojoIntegration,
    routeEDPDependencyTrackIntegration,
    routeEDPJiraIntegration,
    routeEDPGitOpsConfiguration,
    // Marketplace

    routeEDPMarketplace,
];
