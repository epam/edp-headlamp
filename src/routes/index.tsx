import React from 'react';
import RouteCDPipelineDetailsPage from '../pages/cdpipeline-details/page';
import { routeCDPipelineDetails } from '../pages/cdpipeline-details/route';
import RouteCDPipelineListPage from '../pages/cdpipeline-list/page';
import { routeCDPipelineList } from '../pages/cdpipeline-list/route';
import RouteComponentDetailsPage from '../pages/component-details/page';
import { routeComponentDetails } from '../pages/component-details/route';
import RouteComponentListPage from '../pages/component-list/page';
import { routeComponentList } from '../pages/component-list/route';
import RouteArgoCDPage from '../pages/configuration/pages/argocd/page';
import { routeArgoCD } from '../pages/configuration/pages/argocd/route';
import RouteChatAssistantPage from '../pages/configuration/pages/chat-assistant/page';
import { routeChatAssitant } from '../pages/configuration/pages/chat-assistant/route';
import RouteClusterListPage from '../pages/configuration/pages/clusters/page';
import { routeClusters } from '../pages/configuration/pages/clusters/route';
import RouteCodeMiePage from '../pages/configuration/pages/codemie/page';
import { routeCodemie } from '../pages/configuration/pages/codemie/route';
import RouteDefectDojoPage from '../pages/configuration/pages/defect-dojo/page';
import { routeDefectDojo } from '../pages/configuration/pages/defect-dojo/route';
import RouteDependencyTrackPage from '../pages/configuration/pages/dependency-track/page';
import { routeDependencyTrack } from '../pages/configuration/pages/dependency-track/route';
import RouteGitOpsConfigurationPage from '../pages/configuration/pages/gitops/page';
import { routeGitOps } from '../pages/configuration/pages/gitops/route';
import RouteGitServerListPage from '../pages/configuration/pages/gitservers/page';
import { routeGitServerList } from '../pages/configuration/pages/gitservers/route';
import RouteJiraPage from '../pages/configuration/pages/jira/page';
import { routeJira } from '../pages/configuration/pages/jira/route';
import RouteNexusPage from '../pages/configuration/pages/nexus/page';
import { routeNexus } from '../pages/configuration/pages/nexus/route';
import RouteQuickLinkListPage from '../pages/configuration/pages/quicklinks/page';
import { routeQuickLinkList } from '../pages/configuration/pages/quicklinks/route';
import RouteRegistryListPage from '../pages/configuration/pages/registry/page';
import { routeRegistry } from '../pages/configuration/pages/registry/route';
import RouteSonarPage from '../pages/configuration/pages/sonar/page';
import { routeSonar } from '../pages/configuration/pages/sonar/route';
import RouteMarketplacePage from '../pages/marketplace/page';
import { routeMarketplace } from '../pages/marketplace/route';
import RouteOverviewListPage from '../pages/overview-list/page';
import { routeOverviewList } from '../pages/overview-list/route';
import RoutePipelineDetailsPage from '../pages/pipelines/pages/pipeline-details/page';
import { routePipelineDetails } from '../pages/pipelines/pages/pipeline-details/route';
import RoutePipelineListPage from '../pages/pipelines/pages/pipeline-list/page';
import { routePipelineList } from '../pages/pipelines/pages/pipeline-list/route';
import RoutePipelineRunDetailsPage from '../pages/pipelines/pages/pipeline-run-details/page';
import { routePipelineRunDetails } from '../pages/pipelines/pages/pipeline-run-details/route';
import RoutePipelineRunListPage from '../pages/pipelines/pages/pipeline-run-list/page';
import { routePipelineRunList } from '../pages/pipelines/pages/pipeline-run-list/route';
import RouteTaskDetailsPage from '../pages/pipelines/pages/task-details/page';
import { routeTaskDetails } from '../pages/pipelines/pages/task-details/route';
import RouteTaskListPage from '../pages/pipelines/pages/task-list/page';
import { routeTaskList } from '../pages/pipelines/pages/task-list/route';
import RouteStageDetailsPage from '../pages/stage-details/page';
import { routeStageDetails } from '../pages/stage-details/route';

export default [
  // Overview
  { ...routeOverviewList, component: () => <RouteOverviewListPage /> },

  // Pipelines
  { ...routePipelineRunList, component: () => <RoutePipelineRunListPage /> },
  { ...routePipelineRunDetails, component: () => <RoutePipelineRunDetailsPage /> },
  {
    ...routePipelineList,
    component: () => <RoutePipelineListPage />,
  },
  {
    ...routePipelineDetails,
    component: () => <RoutePipelineDetailsPage />,
  },
  {
    ...routeTaskList,
    component: () => <RouteTaskListPage />,
  },
  {
    ...routeTaskDetails,
    component: () => <RouteTaskDetailsPage />,
  },

  // Components & children
  { ...routeComponentList, component: () => <RouteComponentListPage /> },
  { ...routeComponentDetails, component: () => <RouteComponentDetailsPage /> },

  // CD Pipelines & children
  { ...routeCDPipelineList, component: () => <RouteCDPipelineListPage /> },
  { ...routeCDPipelineDetails, component: () => <RouteCDPipelineDetailsPage /> },
  { ...routeStageDetails, component: () => <RouteStageDetailsPage /> },

  // Configuration Group
  { ...routeClusters, component: () => <RouteClusterListPage /> },
  { ...routeGitServerList, component: () => <RouteGitServerListPage /> },
  { ...routeRegistry, component: () => <RouteRegistryListPage /> },
  { ...routeSonar, component: () => <RouteSonarPage /> },
  { ...routeArgoCD, component: () => <RouteArgoCDPage /> },
  { ...routeNexus, component: () => <RouteNexusPage /> },
  { ...routeDefectDojo, component: () => <RouteDefectDojoPage /> },
  {
    ...routeDependencyTrack,
    component: () => <RouteDependencyTrackPage />,
  },
  { ...routeJira, component: () => <RouteJiraPage /> },
  { ...routeGitOps, component: () => <RouteGitOpsConfigurationPage /> },
  { ...routeCodemie, component: () => <RouteCodeMiePage /> },
  { ...routeChatAssitant, component: () => <RouteChatAssistantPage /> },

  {
    ...routeQuickLinkList,
    component: () => <RouteQuickLinkListPage />,
  },

  // Marketplace

  { ...routeMarketplace, component: () => <RouteMarketplacePage /> },
];
