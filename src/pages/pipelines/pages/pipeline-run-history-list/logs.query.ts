export const getLogsAllQuery = (namespace: string) => ({
  size: 0,
  query: {
    bool: {
      filter: [
        {
          range: {
            '@timestamp': {
              gte: 'now-10d',
              lte: 'now',
            },
          },
        },
        {
          term: {
            'kubernetes.namespace_name.keyword': namespace,
          },
        },
      ],
    },
  },
  aggs: {
    unique_pipelineRuns: {
      terms: {
        field: 'kubernetes.labels.tekton_dev/pipelineRun.keyword',
        size: 100,
      },
    },
  },
});
