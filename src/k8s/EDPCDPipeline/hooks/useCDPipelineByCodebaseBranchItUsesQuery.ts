import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineListQuery } from './useCDPipelineListQuery';

export const useCDPipelineByCodebaseBranchItUsesQuery = (
    codebaseBranchName: string,
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>,
        Error,
        EDPCDPipelineKubeObjectInterface
    >
) => {
    return useCDPipelineListQuery({
        select: data => {
            for (const item of data?.items) {
                if (item.spec.inputDockerStreams.includes(codebaseBranchName)) {
                    return item;
                }
            }
        },
        ...options,
    });
};
