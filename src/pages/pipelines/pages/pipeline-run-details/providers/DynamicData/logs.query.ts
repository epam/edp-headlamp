export const getLogsQuery = (namespace: string, name: string) => ({
  _source: ['log', 'kubernetes.labels.tekton_dev/pipelineTask'],
  query: {
    bool: {
      must: [
        {
          match_phrase: {
            'kubernetes.namespace_name': namespace,
          },
        },
        {
          match_phrase: {
            'kubernetes.labels.tekton_dev/pipelineRun': name,
          },
        },
        {
          range: {
            '@timestamp': {
              gte: 'now-10d',
              lte: 'now',
            },
          },
        },
      ],
    },
  },
  sort: [
    {
      '@timestamp': {
        order: 'asc',
      },
    },
  ],
  size: 5000,
});