import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ConfigMapKubeObject } from '../../../../k8s/groups/default/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../k8s/groups/default/ConfigMap/constants';
import { SYSTEM_QUICK_LINKS } from '../../../../k8s/groups/EDP/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import {
  ApiServiceBase,
  DependencyTrackApiService,
  SonarApiService,
} from '../../../../services/api';
import { MetricKey, SonarQubeMetricsResponse } from '../../../../widgets/SonarQubeMetrics/types';
import { ComponentDetailsRouteParams } from '../../types';
import { DataContext } from './context';

function getToken(cluster: string) {
  return JSON.parse(localStorage.tokens || '{}')?.[cluster];
}

const getDepTrackProjectDefaultVersion = (projectCollection: {
  collection: {
    active: boolean;
    classifier: string;
    lastBomImport: number;
    lastBomImportFormat: string;
    lastInheritedRiskScore: number;
    name: string;
    properties: string[];
    tags: string[];
    uuid: string;
    version: string;
  }[];
}) => {
  if (!projectCollection) {
    return null;
  }

  const main = projectCollection.collection.find((item) => item.version === 'main');

  const project = main || projectCollection.collection[0];

  return project?.uuid;
};

const getSonarMetricValues = (metrics: SonarQubeMetricsResponse): Record<MetricKey, string> => {
  const values: Record<MetricKey, string> = {
    alert_status: '',
    bugs: '',
    reliability_rating: '',
    vulnerabilities: '',
    security_rating: '',
    code_smells: '',
    sqale_index: '',
    sqale_rating: '',
    security_hotspots_reviewed: '',
    security_hotspots: '',
    security_review_rating: '',
    coverage: '',
    ncloc: '',
    duplicated_lines_density: '',
  };

  for (const metric of metrics.component.measures) {
    values[metric.metric] = metric.value;
  }

  return values;
};

export const DataContextProvider: React.FC = ({ children }) => {
  const cluster = Utils.getCluster();
  const token = getToken(cluster);
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();

  const [EDPConfigMap] = ConfigMapKubeObject.useGet(EDP_CONFIG_CONFIG_MAP_NAME, namespace);

  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();

  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const noApiGatewayUrlError = React.useMemo(
    () =>
      !apiGatewayUrl && {
        message: 'No API Gateway URL found in the EDP Config ConfigMap',
      },
    [apiGatewayUrl]
  );

  const apiService = new ApiServiceBase(apiGatewayUrl, token);

  const sonarApiService = new SonarApiService(apiService);
  const depTrackApiService = new DependencyTrackApiService(apiService);

  const {
    data: sonarMetrics,
    isFetched: sonarMetricsIsFetched,
    error: sonarMetricsError,
  } = useQuery(
    ['sonarMetrics', namespace, name],
    () => apiService.createFetcher(sonarApiService.getMetricsEndpoint(name)),
    {
      enabled: !!apiService.apiBaseURL,
      select: (data) => getSonarMetricValues(data),
    }
  );

  const {
    data: depTrackProject,
    error: depTrackProjectError,
    status: depTrackProjectQueryStatus,
  } = useQuery(
    ['depTrackProject', namespace, name],
    () => apiService.createFetcher(depTrackApiService.getProjectEndpoint(name)),
    {
      enabled: !!apiService.apiBaseURL,
    }
  );

  const depTrackProjectID = getDepTrackProjectDefaultVersion(depTrackProject);

  const { data: depTrackProjectMetrics, error: depTrackProjectMetricsError } = useQuery(
    ['depTrackProjectMetrics', namespace, name],
    () => apiService.createFetcher(depTrackApiService.getProjectMetricsEndpoint(depTrackProjectID)),
    {
      enabled: !!apiService.apiBaseURL && !!depTrackProjectID,
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      depTrackData: {
        data: {
          metrics: depTrackProjectMetrics,
          baseUrl: QuickLinksURLS?.[SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK],
        },
        error: (noApiGatewayUrlError ||
          depTrackProjectError ||
          depTrackProjectMetricsError) as ApiError,
        isLoading:
          !noApiGatewayUrlError &&
          depTrackProjectQueryStatus !== 'success' &&
          !depTrackProjectError &&
          !depTrackProjectMetricsError,
      },
      sonarData: {
        data: {
          metrics: sonarMetrics,
          baseUrl: QuickLinksURLS?.[SYSTEM_QUICK_LINKS.SONAR],
        },
        error: (noApiGatewayUrlError || sonarMetricsError) as ApiError,
        isLoading: !noApiGatewayUrlError && !sonarMetricsIsFetched,
      },
    }),
    [
      QuickLinksURLS,
      depTrackProjectError,
      depTrackProjectMetrics,
      depTrackProjectMetricsError,
      depTrackProjectQueryStatus,
      noApiGatewayUrlError,
      sonarMetrics,
      sonarMetricsError,
      sonarMetricsIsFetched,
    ]
  );

  return <DataContext.Provider value={DataContextValue}>{children}</DataContext.Provider>;
};
