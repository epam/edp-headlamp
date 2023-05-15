import { useJenkinsListQuery } from './useJenkinsListQuery';

export const useJenkinsAgentsQuery = () => {
    return useJenkinsListQuery<string[]>({
        options: {
            select: data => data?.items?.[0].status.slaves.map(el => el.name),
        },
    });
};
