export type MetricKey =
    | 'alert_status'
    | 'bugs'
    | 'reliability_rating'
    | 'vulnerabilities'
    | 'security_rating'
    | 'code_smells'
    | 'sqale_index'
    | 'sqale_rating'
    | 'security_hotspots_reviewed'
    | 'security_hotspots'
    | 'security_review_rating'
    | 'coverage'
    | 'ncloc'
    | 'duplicated_lines_density';

export interface Metric {
    metric: MetricKey;
    value: string;
    bestValue?: boolean;
}

export interface SonarQubeMetricsResponse {
    component: {
        key: string;
        name: string;
        qualifier: string;
        measures: Metric[];
    };
}

export type DuplicationRating = {
    greaterThan: number;
    rating: '1.0' | '2.0' | '3.0' | '4.0' | '5.0';
};

export interface SonarQubeMetricsProps {
    codebaseBranchMetadataName: string;
    namespace: string;
}
