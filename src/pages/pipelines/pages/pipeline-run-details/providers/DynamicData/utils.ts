import { NormalizedLogs, OpensearchResponse } from './types';

export const normalizeLogs = (response: OpensearchResponse): NormalizedLogs => {
  if (!response?.hits?.hits || !response.hits.hits.length) {
    return { map: {}, order: [], all: [] };
  }

  const result = (response?.hits?.hits || []).reduce(
    (acc: { map: { [key: string]: string[] }; order: string[]; all: string[] }, cur) => {
      const taskName = cur._source?.kubernetes?.labels?.['tekton_dev/pipelineTask'];

      if (!taskName) {
        return acc;
      }

      if (!acc.map[taskName]) {
        acc.map[taskName] = [];
        acc.order.push(taskName);
      }

      const logStr = `${cur._source.log}\n` || '';

      acc.map[taskName].push(logStr);
      acc.all.push(logStr);
      return acc;
    },
    { map: {}, order: [], all: [] }
  );

  return { map: result.map, order: result.order, all: result.all };
};
