import { UseQueryOptions } from 'react-query';
import { React } from '../../../plugin.globals';
import { KubeObjectListInterface } from '../../../types/k8s';
import { useCDPipelineStageListQuery } from '../../EDPCDPipelineStage/hooks/useCDPipelineStageListQuery';
import { EDPCDPipelineStageKubeObjectInterface } from '../../EDPCDPipelineStage/types';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

interface UseCDPipelineByAutotestBranchItUsesInItsStagesQueryProps {
    props: {
        codebaseBranchName: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        EDPCDPipelineKubeObjectInterface
    >;
}

export const useCDPipelineByAutotestBranchItUsesInItsStagesQuery = ({
    props,
    options,
}: UseCDPipelineByAutotestBranchItUsesInItsStagesQueryProps) => {
    const { codebaseBranchName } = props;

    const [CDPipelineName, setCDPipelineName] = React.useState<string>(null);
    const query = useCDPipelineByNameQuery({
        props: {
            name: CDPipelineName,
        },
        options: {
            enabled: !!CDPipelineName,
        },
    });

    useCDPipelineStageListQuery<EDPCDPipelineKubeObjectInterface>({
        options: {
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
            enabled: options?.enabled && !!codebaseBranchName,
        },
    });

    return query;
};
