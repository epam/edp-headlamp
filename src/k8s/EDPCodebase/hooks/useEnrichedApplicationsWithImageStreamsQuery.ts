import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { EDPCDPipelineKubeObjectInterface } from '../../EDPCDPipeline/types';
import { useCodebaseImageStreamListQuery } from '../../EDPCodebaseImageStream/hooks/useCodebaseImageStreamListQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../EDPCodebaseImageStream/types';
import { EDPCodebaseKubeObjectInterface } from '../types';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export interface EnrichedApplicationWithImageStreams {
    application: EDPCodebaseKubeObjectInterface;
    applicationImageStream: string;
    applicationImageStreams: EDPCodebaseImageStreamKubeObjectInterface[];
    toPromote: boolean;
}

export const useEnrichedApplicationsWithImageStreamsQuery = (
    CDPipelineData: EDPCDPipelineKubeObjectInterface
) => {
    const CDPipelineApplicationListSet = new Set<string>(CDPipelineData?.spec.applications);
    const CDPipelineApplicationToPromoteListSet = new Set<string>(
        CDPipelineData?.spec.applicationsToPromote
    );

    const { data: codebaseImageStreams } = useCodebaseImageStreamListQuery();
    return useCodebasesByTypeLabelQuery(CODEBASE_TYPES.APPLICATION, {
        select: data => {
            return data?.items.map(el => {
                const {
                    metadata: { name },
                } = el;

                if (!CDPipelineApplicationListSet.has(name)) {
                    return;
                }

                const codebaseImageStreamsByCodebaseName = codebaseImageStreams?.items.filter(
                    ({ spec: { codebase } }) => codebase === name
                );

                const CDPipelineSpecApplicationIndex = CDPipelineData.spec.applications.findIndex(
                    appName => appName === name
                );

                const applicationImageStream =
                    CDPipelineData.spec.inputDockerStreams[CDPipelineSpecApplicationIndex];

                return {
                    application: { ...el },
                    applicationImageStream,
                    toPromote: CDPipelineApplicationToPromoteListSet.has(name),
                    applicationImageStreams: codebaseImageStreamsByCodebaseName,
                };
            });
        },
    });
};
