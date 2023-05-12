import { useJiraServerListQuery } from './useJiraServerListQuery';

export const useJiraServerNameListQuery = () => {
    return useJiraServerListQuery<string[]>({
        select: data => data.items.map(el => el.metadata.name),
    });
};
