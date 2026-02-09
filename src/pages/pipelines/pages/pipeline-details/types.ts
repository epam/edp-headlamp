export interface PipelineDetailsRouteParams {
  name: string;
  namespace: string;
}

export type NormalizedLogs = string[];

export interface Shards {
  failed: number;
  skipped: number;
  successful: number;
  total: number;
}

export interface Bucket {
  doc_count: number;
  key: string;
}

export interface UniquePipelineRuns {
  buckets: Bucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
}

export interface Aggregations {
  unique_pipelineRuns: UniquePipelineRuns;
}

export interface Total {
  relation: string;
  value: number;
}

export interface Hits {
  hits: any[];
  max_score: null | number;
  total: Total;
}

export interface OpensearchResponse {
  _shards: Shards;
  aggregations: Aggregations;
  hits: Hits;
  timed_out: boolean;
  took: number;
}
