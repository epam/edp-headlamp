import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useEDPComponentsURLsQuery } from '../../../../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useSecretByNameQuery } from '../../../../../../../../../k8s/Secret/hooks/useSecretByName';
import { safeDecode, safeEncode } from '../../../../../../../../../utils/decodeEncode';
import {
    MetricKey,
    SonarQubeMetricsResponse,
} from '../../../../../../../../../widgets/SonarQubeMetrics/types';
import { EDPComponentDetailsRouteParams } from '../../../../../../../types';

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
    const [metrics, setMetrics] = React.useState<{ [key in MetricKey]?: string }>(null);

    useQuery(['sonarQubeMetrics', { codebaseBranchName: codebaseBranchName }], {
        queryFn: () => {
            return fetch(fetchURL, {
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
                .then((data: SonarQubeMetricsResponse) => {
                    setMetrics(getMetricsValues(data));
                })
                .catch(error => {
                    console.error(error);
                });
        },
        enabled: !!sonarQubeBaseURL && !!ciSonarQubeToken,
    });

    return metrics;
};
