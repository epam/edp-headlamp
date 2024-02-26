import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSecretByNameQuery } from '../../../k8s/Secret/hooks/useSecretByName';
import { QuickLinkDetailsRouteParams } from '../../../pages/edp-component-details/types';
import { LinkCreationService } from '../../../services/link-creation';
import { safeDecode, safeEncode } from '../../../utils/decodeEncode';
import { MetricKey, SonarQubeMetricsResponse } from '../types';

const getMetricsValues = (metrics: SonarQubeMetricsResponse) => {
  const values: { [key in MetricKey]?: string } = {};

  for (const metric of metrics.component.measures) {
    values[metric.metric] = metric.value;
  }

  return values;
};

export const useSonarQubeMetrics = (
  sonarQubeBaseURL: string,
  codebaseName: string,
  branchName: string
) => {
  const { namespace } = useParams<QuickLinkDetailsRouteParams>();

  const { data: ciSonarQubeToken } = useSecretByNameQuery<string>({
    props: {
      namespace,
      name: 'ci-sonarqube',
    },
    options: {
      select: (data) => {
        return safeDecode(data?.data?.token);
      },
    },
  });

  const fetchURL = LinkCreationService.sonar.createMetricsApiUrl(
    sonarQubeBaseURL,
    codebaseName,
    branchName
  );

  const { data, isFetched } = useQuery(
    ['sonarQubeMetrics', { codebaseName: codebaseName, branchName: branchName }],
    {
      queryFn: async () =>
        fetch(fetchURL, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${safeEncode(`${ciSonarQubeToken}:`)}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(`Request failed: ${response.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
          }),
      select: (data: SonarQubeMetricsResponse) => getMetricsValues(data),
      onError: () => undefined,
      enabled: !!sonarQubeBaseURL && !!ciSonarQubeToken,
    }
  );

  return { data, isLoading: !sonarQubeBaseURL ? false : !isFetched && !!ciSonarQubeToken };
};
