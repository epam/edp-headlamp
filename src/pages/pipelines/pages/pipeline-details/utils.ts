import { NormalizedLogs, OpensearchResponse } from './types';

export const normalizeLogs = (data: OpensearchResponse): NormalizedLogs => {
  if (
    data.aggregations &&
    data.aggregations.unique_pipelineRuns &&
    data.aggregations.unique_pipelineRuns.buckets
  ) {
    return data.aggregations.unique_pipelineRuns.buckets.map((bucket) => bucket.key);
  }
  return [];
};
