import React from 'react';
import RouteEDPCDPipelineDetailsPage from '../pages/edp-cdpipeline-details/page';
import { routeEDPCDPipelineDetails } from '../pages/edp-cdpipeline-details/route';
import RouteEDPCDPipelineListPage from '../pages/edp-cdpipeline-list/page';
import { routeEDPCDPipelineList } from '../pages/edp-cdpipeline-list/route';
import RouteEDPComponentDetailsPage from '../pages/edp-component-details/page';
import { routeEDPComponentDetails } from '../pages/edp-component-details/route';
import RouteEDPComponentListPage from '../pages/edp-component-list/page';
import { routeEDPComponentList } from '../pages/edp-component-list/route';
import RouteEDPArgoCDIntegrationPage from '../pages/edp-configuration/pages/edp-argocd-integration/page';
import { routeEDPArgoCDIntegration } from '../pages/edp-configuration/pages/edp-argocd-integration/route';
import RouteEDPClusterListPage from '../pages/edp-configuration/pages/edp-cluster-list/page';
import { routeEDPClusterList } from '../pages/edp-configuration/pages/edp-cluster-list/route';
import RouteEDPDefectDojoIntegrationPage from '../pages/edp-configuration/pages/edp-defect-dojo-integration/page';
import { routeEDPDefectDojoIntegration } from '../pages/edp-configuration/pages/edp-defect-dojo-integration/route';
import RouteEDPDependencyTrackIntegrationPage from '../pages/edp-configuration/pages/edp-dependency-track-integration/page';
import { routeEDPDependencyTrackIntegration } from '../pages/edp-configuration/pages/edp-dependency-track-integration/route';
import RouteEDPGitOpsConfigurationPage from '../pages/edp-configuration/pages/edp-gitops/page';
import { routeEDPGitOpsConfiguration } from '../pages/edp-configuration/pages/edp-gitops/route';
import RouteEDPGitServerListPage from '../pages/edp-configuration/pages/edp-gitserver-list/page';
import { routeEDPGitServerList } from '../pages/edp-configuration/pages/edp-gitserver-list/route';
import RouteEDPJiraIntegrationPage from '../pages/edp-configuration/pages/edp-jira-integration/page';
import { routeEDPJiraIntegration } from '../pages/edp-configuration/pages/edp-jira-integration/route';
import RouteEDPNexusIntegrationPage from '../pages/edp-configuration/pages/edp-nexus-integration/page';
import { routeEDPNexusIntegration } from '../pages/edp-configuration/pages/edp-nexus-integration/route';
import RouteEDPQuickLinkListPage from '../pages/edp-configuration/pages/edp-quick-link-list/page';
import { routeQuickLinkList } from '../pages/edp-configuration/pages/edp-quick-link-list/route';
import RouteEDPRegistryListPage from '../pages/edp-configuration/pages/edp-registry-list/page';
import { routeEDPRegistryList } from '../pages/edp-configuration/pages/edp-registry-list/route';
import RouteEDPSonarIntegrationPage from '../pages/edp-configuration/pages/edp-sonar-integration/page';
import { routeEDPSonarIntegration } from '../pages/edp-configuration/pages/edp-sonar-integration/route';
import RouteEDPSSOIntegrationPage from '../pages/edp-configuration/pages/edp-sso-integration/page';
import { routeEDPSSOIntegration } from '../pages/edp-configuration/pages/edp-sso-integration/route';
import RouteEDPMarketplacePage from '../pages/edp-marketplace/page';
import { routeEDPMarketplace } from '../pages/edp-marketplace/route';
import RouteEDPOverviewListPage from '../pages/edp-overview-list/page';
import { routeEDPOverviewList } from '../pages/edp-overview-list/route';
import RouteEDPPipelineListPage from '../pages/edp-pipelines/page';
import { routeEDPPipelineList } from '../pages/edp-pipelines/route';
import RouteEDPStageDetailsPage from '../pages/edp-stage-details/page';
import { routeEDPStageDetails } from '../pages/edp-stage-details/route';

export default [
  // Overview
  { ...routeEDPOverviewList, component: () => <RouteEDPOverviewListPage /> },

  // Pipelines
  { ...routeEDPPipelineList, component: () => <RouteEDPPipelineListPage /> },

  // Components & children
  { ...routeEDPComponentList, component: () => <RouteEDPComponentListPage /> },
  { ...routeEDPComponentDetails, component: () => <RouteEDPComponentDetailsPage /> },

  // CD Pipelines & children
  { ...routeEDPCDPipelineList, component: () => <RouteEDPCDPipelineListPage /> },
  { ...routeEDPCDPipelineDetails, component: () => <RouteEDPCDPipelineDetailsPage /> },
  { ...routeEDPStageDetails, component: () => <RouteEDPStageDetailsPage /> },

  // Configuration Group
  { ...routeEDPClusterList, component: () => <RouteEDPClusterListPage /> },
  { ...routeEDPGitServerList, component: () => <RouteEDPGitServerListPage /> },
  { ...routeEDPRegistryList, component: () => <RouteEDPRegistryListPage /> },
  { ...routeEDPSonarIntegration, component: () => <RouteEDPSonarIntegrationPage /> },
  { ...routeEDPArgoCDIntegration, component: () => <RouteEDPArgoCDIntegrationPage /> },
  { ...routeEDPNexusIntegration, component: () => <RouteEDPNexusIntegrationPage /> },
  { ...routeEDPDefectDojoIntegration, component: () => <RouteEDPDefectDojoIntegrationPage /> },
  {
    ...routeEDPDependencyTrackIntegration,
    component: () => <RouteEDPDependencyTrackIntegrationPage />,
  },
  { ...routeEDPJiraIntegration, component: () => <RouteEDPJiraIntegrationPage /> },
  { ...routeEDPGitOpsConfiguration, component: () => <RouteEDPGitOpsConfigurationPage /> },
  { ...routeEDPSSOIntegration, component: () => <RouteEDPSSOIntegrationPage /> },
  {
    ...routeQuickLinkList,
    component: () => <RouteEDPQuickLinkListPage />,
  },
  // Marketplace

  { ...routeEDPMarketplace, component: () => <RouteEDPMarketplacePage /> },
];
