import React from 'react';
import RouteCDPipelineDetailsPage from '../pages/cdpipeline-details/page';
import { routeCDPipelineDetails } from '../pages/cdpipeline-details/route';
import RouteCDPipelineListPage from '../pages/cdpipeline-list/page';
import { routeCDPipelineList } from '../pages/cdpipeline-list/route';
import RouteComponentDetailsPage from '../pages/component-details/page';
import { routeComponentDetails } from '../pages/component-details/route';
import RouteComponentListPage from '../pages/component-list/page';
import { routeComponentList } from '../pages/component-list/route';
import RouteEDPArgoCDIntegrationPage from '../pages/configuration/pages/edp-argocd-integration/page';
import { routeEDPArgoCDIntegration } from '../pages/configuration/pages/edp-argocd-integration/route';
import RouteEDPClusterListPage from '../pages/configuration/pages/edp-cluster-list/page';
import { routeEDPClusterList } from '../pages/configuration/pages/edp-cluster-list/route';
import RouteEDPCodeMieIntegrationPage from '../pages/configuration/pages/edp-codemie-integration/page';
import { routeEDPCodeMieIntegration } from '../pages/configuration/pages/edp-codemie-integration/route';
import RouteEDPDefectDojoIntegrationPage from '../pages/configuration/pages/edp-defect-dojo-integration/page';
import { routeEDPDefectDojoIntegration } from '../pages/configuration/pages/edp-defect-dojo-integration/route';
import RouteEDPDependencyTrackIntegrationPage from '../pages/configuration/pages/edp-dependency-track-integration/page';
import { routeEDPDependencyTrackIntegration } from '../pages/configuration/pages/edp-dependency-track-integration/route';
import RouteEDPGitOpsConfigurationPage from '../pages/configuration/pages/edp-gitops/page';
import { routeEDPGitOpsConfiguration } from '../pages/configuration/pages/edp-gitops/route';
import RouteGitServerListPage from '../pages/configuration/pages/edp-gitserver-list/page';
import { routeGitServerList } from '../pages/configuration/pages/edp-gitserver-list/route';
import RouteEDPJiraIntegrationPage from '../pages/configuration/pages/edp-jira-integration/page';
import { routeEDPJiraIntegration } from '../pages/configuration/pages/edp-jira-integration/route';
import RouteEDPNexusIntegrationPage from '../pages/configuration/pages/edp-nexus-integration/page';
import { routeEDPNexusIntegration } from '../pages/configuration/pages/edp-nexus-integration/route';
import RouteEDPQuickLinkListPage from '../pages/configuration/pages/edp-quick-link-list/page';
import { routeQuickLinkList } from '../pages/configuration/pages/edp-quick-link-list/route';
import RouteEDPRegistryListPage from '../pages/configuration/pages/edp-registry-list/page';
import { routeEDPRegistryList } from '../pages/configuration/pages/edp-registry-list/route';
import RouteEDPSonarIntegrationPage from '../pages/configuration/pages/edp-sonar-integration/page';
import { routeEDPSonarIntegration } from '../pages/configuration/pages/edp-sonar-integration/route';
import RouteEDPSSOIntegrationPage from '../pages/configuration/pages/edp-sso-integration/page';
import { routeEDPSSOIntegration } from '../pages/configuration/pages/edp-sso-integration/route';
import RouteEDPMarketplacePage from '../pages/marketplace/page';
import { routeMarketplace } from '../pages/marketplace/route';
import RouteEDPOverviewListPage from '../pages/overview-list/page';
import { routeOverviewList } from '../pages/overview-list/route';
import RouteEDPPipelineDetailsPage from '../pages/pipeline-details/page';
import { routePipelineDetails } from '../pages/pipeline-details/route';
import RouteEDPPipelineListPage from '../pages/pipelines/page';
import { routePipelineList } from '../pages/pipelines/route';
import RouteEDPStageDetailsPage from '../pages/stage-details/page';
import { routeStageDetails } from '../pages/stage-details/route';

export default [
  // Overview
  { ...routeOverviewList, component: () => <RouteEDPOverviewListPage /> },

  // Pipelines
  { ...routePipelineList, component: () => <RouteEDPPipelineListPage /> },
  { ...routePipelineDetails, component: () => <RouteEDPPipelineDetailsPage /> },

  // Components & children
  { ...routeComponentList, component: () => <RouteComponentListPage /> },
  { ...routeComponentDetails, component: () => <RouteComponentDetailsPage /> },

  // CD Pipelines & children
  { ...routeCDPipelineList, component: () => <RouteCDPipelineListPage /> },
  { ...routeCDPipelineDetails, component: () => <RouteCDPipelineDetailsPage /> },
  { ...routeStageDetails, component: () => <RouteEDPStageDetailsPage /> },

  // Configuration Group
  { ...routeEDPClusterList, component: () => <RouteEDPClusterListPage /> },
  { ...routeGitServerList, component: () => <RouteGitServerListPage /> },
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
  { ...routeEDPCodeMieIntegration, component: () => <RouteEDPCodeMieIntegrationPage /> },
  {
    ...routeQuickLinkList,
    component: () => <RouteEDPQuickLinkListPage />,
  },
  // Marketplace

  { ...routeMarketplace, component: () => <RouteEDPMarketplacePage /> },
];
