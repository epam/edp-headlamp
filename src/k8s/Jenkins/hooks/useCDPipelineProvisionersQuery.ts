import { useJenkinsListQuery } from './useJenkinsListQuery';

export const useCDPipelineProvisionersQuery = () => {
    return useJenkinsListQuery<string[]>({
        options: {
            select: data => {
                const firstJenkinsResource = data?.items?.[0];
                return firstJenkinsResource.status.jobProvisions.reduce((acc, cur) => {
                    const { scope, name } = cur;
                    if (scope === 'cd') {
                        acc.push(name);
                    }
                    return acc;
                }, []);
            },
        },
    });
};
