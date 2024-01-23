import { useJiraServerListQuery } from './useJiraServerListQuery';

export const useJiraServerNameListQuery = () => {
  return useJiraServerListQuery<string[]>({
    options: {
      select: data => data.items.map(el => el.metadata.name),
    },
  });
};
