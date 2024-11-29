import { OpensearchResponse } from './types';

export const normalizeLogs = (response: OpensearchResponse) => {
  if (!response?.hits?.hits || !response.hits.hits.length) {
    return { map: {}, order: [] };
  }

  const result = (response?.hits?.hits || []).reduce(
    (acc, cur) => {
      const taskName = cur._source?.kubernetes?.labels?.['tekton_dev/pipelineTask'];

      if (!taskName) {
        return acc;
      }

      if (!acc.map[taskName]) {
        acc.map[taskName] = [];
        acc.order.push(taskName);
      }

      acc.map[taskName].push(`${cur._source.log}\n` || '');
      return acc;
    },
    { map: {}, order: [] }
  );

  return { map: result.map, order: result.order };
};
