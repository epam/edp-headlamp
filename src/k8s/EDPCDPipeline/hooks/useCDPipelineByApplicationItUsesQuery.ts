import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineListQuery } from './useCDPipelineListQuery';

export const useCDPipelineByApplicationItUsesQuery = (
    codebaseName: string,
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>,
        Error,
        EDPCDPipelineKubeObjectInterface
    >
) => {
    return useCDPipelineListQuery<EDPCDPipelineKubeObjectInterface>({
        select: data => {
            for (const item of data?.items) {
                if (item.spec.applications.includes(codebaseName)) {
                    return item;
                }
            }
        },
        ...options,
    });
};
