import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useQuickLinksURLsQuery } from '../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { useSecretByNameQuery } from '../../../../k8s/Secret/hooks/useSecretByName';
import { LinkCreationService } from '../../../../services/link-creation';
import { safeDecode, safeEncode } from '../../../../utils/decodeEncode';
import { MetricKey, SonarQubeMetricsResponse } from '../../../../widgets/SonarQubeMetrics/types';
import { ComponentDetailsRouteParams } from '../../types';
import { useDynamicDataContext } from '../DynamicData/hooks';
import { DataContext } from './context';

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

const fetcher = async (url: string, headers: Record<string, string>) => {
  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed: ${response.status}`);
      }
    })
    .catch((error) => {
      throw new Error(`Request failed: ${error?.message}`);
    });
};

export const DataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();
  const { data: QuickLinksURLs } = useQuickLinksURLsQuery();
  const { component } = useDynamicDataContext();
  const sonarQubeBaseURL = QuickLinksURLs?.sonar;
  const depTrackBaseURL = QuickLinksURLs?.['dependency-track'];

  const { data: sonarSecret, error: sonarSecretError } = useSecretByNameQuery<{
    token: string;
  }>({
    props: {
      namespace,
      name: INTEGRATION_SECRET_NAMES.SONAR,
    },
    options: {
      select: (data) => ({
        token: safeDecode(data?.data?.token),
      }),
    },
  });

  const { data: depTrackSecret, error: depTrackSecretError } = useSecretByNameQuery<{
    token: string;
  }>({
    props: {
      namespace,
      name: INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK,
    },
    options: {
      select: (data) => ({
        token: safeDecode(data?.data?.token),
      }),
    },
  });

  const depTrackRequestHeaders = {
    'X-Api-Key': depTrackSecret?.token,
  };

  const projectByNameApiUrl = LinkCreationService.depTrack.createProjectByNameApiUrl(
    depTrackBaseURL,
    name
  );

  const { data: projectUUID, error: depTrackProjectError } = useQuery(
    ['depTrackProjectByName', { codebaseName: name }],
    {
      queryFn: async () => fetcher(projectByNameApiUrl, depTrackRequestHeaders),
      select: (data) => data?.[0]?.uuid,
      onError: () => undefined,
      enabled: !!depTrackBaseURL && !!depTrackSecret?.token,
    }
  );

  const projectVulnsApiUrl = LinkCreationService.depTrack.createProjectVulnsApiUrl(
    depTrackBaseURL,
    projectUUID
  );

  const {
    data: projectVulnsData,
    isFetched: projectVulnsDataIsFetched,
    error: projectVulnsDataError,
  } = useQuery(['depTrackProjectVulns', { projectUUID: projectUUID }], {
    queryFn: async () => fetcher(projectVulnsApiUrl, depTrackRequestHeaders),
    onError: () => undefined,
    enabled: !!depTrackBaseURL && !!depTrackSecret?.token && !!projectUUID,
  });

  const sonarMetricsApiUrl = LinkCreationService.sonar.createMetricsApiUrl({
    baseURL: sonarQubeBaseURL,
    codebaseName: name,
    defaultBranchName: component.data?.spec.defaultBranch,
  });
  const sonarRequestHeaders = {
    Authorization: `Basic ${safeEncode(`${sonarSecret?.token}:`)}`,
  };

  const {
    data: sonarMetricsData,
    isFetched: sonarMetricsDataIsFetched,
    error: sonarMetricsDataError,
  } = useQuery(['sonarQubeMetrics', { codebaseName: name }], {
    queryFn: async () => fetcher(sonarMetricsApiUrl, sonarRequestHeaders),
    select: (data: SonarQubeMetricsResponse) => getSonarMetricValues(data),
    onError: () => undefined,
    enabled: !!sonarQubeBaseURL && !!sonarSecret?.token && !!component.data,
  });

  const depTrackError = (depTrackSecretError ||
    depTrackProjectError ||
    projectVulnsDataError) as ApiError;

  const depTrackIsLoading = !depTrackBaseURL
    ? false
    : !projectVulnsDataIsFetched && !!depTrackSecret?.token && !depTrackError;

  const sonarError = (sonarSecretError || sonarMetricsDataError) as ApiError;
  const sonarIsLoading = !sonarQubeBaseURL
    ? false
    : !sonarMetricsDataIsFetched && !!sonarSecret?.token && !sonarError;

  const DataContextValue = React.useMemo(
    () => ({
      depTrackData: {
        data: {
          metrics: projectVulnsData,
          baseUrl: depTrackBaseURL,
        },
        error: depTrackError,
        isLoading: depTrackIsLoading,
      },
      sonarData: {
        data: {
          metrics: sonarMetricsData,
          baseUrl: sonarQubeBaseURL,
        },
        error: sonarError,
        isLoading: sonarIsLoading,
      },
    }),
    [
      depTrackBaseURL,
      depTrackError,
      depTrackIsLoading,
      projectVulnsData,
      sonarError,
      sonarIsLoading,
      sonarMetricsData,
      sonarQubeBaseURL,
    ]
  );

  return <DataContext.Provider value={DataContextValue}>{children}</DataContext.Provider>;
};
