import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useEDPComponentsURLsQuery } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useSecretByNameQuery } from '../../../k8s/Secret/hooks/useSecretByName';
import { EDPComponentDetailsRouteParams } from '../../../pages/edp-component-details/types';
import { safeDecode, safeEncode } from '../../../utils/decodeEncode';
import { MetricKey, SonarQubeMetricsResponse } from '../types';

const getMetricsValues = (metrics: SonarQubeMetricsResponse) => {
    const values: { [key in MetricKey]?: string } = {};

    for (const metric of metrics.component.measures) {
        values[metric.metric] = metric.value;
    }

    return values;
};

export const useSonarQubeMetrics = (codebaseBranchName: string) => {
    const { namespace } = useParams<EDPComponentDetailsRouteParams>();

    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const sonarQubeBaseURL = EDPComponentsURLS?.sonar;
    const { data: ciSonarQubeToken } = useSecretByNameQuery<string>({
        props: {
            namespace,
            name: 'ci-sonarqube',
        },
        options: {
            select: data => {
                return safeDecode(data?.data?.token);
            },
        },
    });
    const fetchURL = `${sonarQubeBaseURL}/api/measures/component?component=${codebaseBranchName}&metricKeys=bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities`;

    const { data, isFetched } = useQuery(
        ['sonarQubeMetrics', { codebaseBranchName: codebaseBranchName }],
        {
            queryFn: async () =>
                fetch(fetchURL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Basic ${safeEncode(`${ciSonarQubeToken}:`)}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(`Request failed: ${response.status}`);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    }),
            select: (data: SonarQubeMetricsResponse) => getMetricsValues(data),
            onError: () => undefined,
            enabled: !!sonarQubeBaseURL && !!ciSonarQubeToken,
        }
    );

    return { data, isLoading: !isFetched && !!ciSonarQubeToken };
};
