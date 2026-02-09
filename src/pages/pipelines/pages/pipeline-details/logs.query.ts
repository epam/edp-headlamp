export const getLogsQuery = (namespace: string, pipelineName: string) => ({
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
        {
          term: {
            'kubernetes.labels.tekton_dev/pipeline.keyword': pipelineName,
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
