import { UseQueryOptions } from 'react-query';
import { React } from '../../../plugin.globals';
import { KubeObjectListInterface } from '../../../types/k8s';
import { useCDPipelineStageListQuery } from '../../EDPCDPipelineStage/hooks/useCDPipelineStageListQuery';
import { EDPCDPipelineStageKubeObjectInterface } from '../../EDPCDPipelineStage/types';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

export const useCDPipelineByAutotestBranchItUsesInItsStagesQuery = (
    codebaseBranchName: string,
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        EDPCDPipelineKubeObjectInterface
    >
) => {
    const [CDPipelineName, setCDPipelineName] = React.useState<string>(null);
    const query = useCDPipelineByNameQuery(CDPipelineName);

    useCDPipelineStageListQuery<EDPCDPipelineKubeObjectInterface>({
        onSuccess: async data => {
            for (const {
                spec: { qualityGates, cdPipeline },
            } of data?.items) {
                for (const { branchName } of qualityGates) {
                    if (branchName && branchName === codebaseBranchName) {
                        setCDPipelineName(cdPipeline);
                    }
                }
            }
        },
        ...options,
    });

    return query;
};
