import { useJenkinsListQuery } from './useJenkinsListQuery';

export const useCIPipelineProvisionersQuery = () => {
    return useJenkinsListQuery<string[]>({
        options: {
            select: data => {
                const firstJenkinsResource = data?.items?.[0];
                return firstJenkinsResource.status.jobProvisions.reduce((acc, cur) => {
                    const { scope, name } = cur;
                    if (scope === 'ci') {
                        acc.push(name);
                    }
                    return acc;
                }, <string[]>[]);
            },
        },
    });
};
