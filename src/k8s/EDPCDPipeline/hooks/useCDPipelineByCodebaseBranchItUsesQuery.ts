import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineListQuery } from './useCDPipelineListQuery';

interface UseCDPipelineByCodebaseBranchItUsesQuery {
    props: {
        codebaseBranchName: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>,
        Error,
        EDPCDPipelineKubeObjectInterface
    >;
}

export const useCDPipelineByCodebaseBranchItUsesQuery = ({
    props,
    options,
}: UseCDPipelineByCodebaseBranchItUsesQuery) => {
    const { codebaseBranchName } = props;
    return useCDPipelineListQuery({
        options: {
            select: data => {
                for (const item of data?.items) {
                    if (item.spec.inputDockerStreams.includes(codebaseBranchName)) {
                        return item;
                    }
                }
            },
            ...options,
            enabled: options?.enabled && !!codebaseBranchName,
        },
    });
};
