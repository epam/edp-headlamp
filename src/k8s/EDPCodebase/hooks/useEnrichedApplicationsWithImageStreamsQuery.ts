import { UseQueryOptions } from 'react-query';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { React } from '../../../plugin.globals';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineKubeObjectInterface } from '../../EDPCDPipeline/types';
import { useCodebaseImageStreamListQuery } from '../../EDPCodebaseImageStream/hooks/useCodebaseImageStreamListQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../EDPCodebaseImageStream/types';
import { EDPCodebaseKubeObjectInterface } from '../types';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export interface EnrichedApplicationWithItsImageStreams {
    application: EDPCodebaseKubeObjectInterface;
    applicationImageStream: EDPCodebaseImageStreamKubeObjectInterface;
    applicationImageStreams: EDPCodebaseImageStreamKubeObjectInterface[];
    toPromote: boolean;
}

interface UseEnrichedApplicationsWithImageStreamsQueryProps {
    props: {
        CDPipelineData: EDPCDPipelineKubeObjectInterface;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCodebaseKubeObjectInterface>,
        Error,
        EnrichedApplicationWithItsImageStreams[]
    >;
}

export const useEnrichedApplicationsWithImageStreamsQuery = ({
    props,
    options,
}: UseEnrichedApplicationsWithImageStreamsQueryProps) => {
    const { CDPipelineData } = props;

    const CDPipelineApplicationListSet = new Set<string>(CDPipelineData?.spec.applications);
    const CDPipelineApplicationToPromoteListSet = new Set<string>(
        CDPipelineData?.spec.applicationsToPromote
    );

    const normalizedInputDockerStreamNames = React.useMemo(
        () => CDPipelineData?.spec.inputDockerStreams.map(el => el.replaceAll('.', '-')),
        [CDPipelineData?.spec.inputDockerStreams]
    );

    const CDPipelineInputDockerStreamsSet = React.useMemo(
        () => new Set<string>(normalizedInputDockerStreamNames),
        [normalizedInputDockerStreamNames]
    );

    const { data: codebaseImageStreams } = useCodebaseImageStreamListQuery({
        props: {
            namespace: CDPipelineData?.metadata.namespace,
        },
        options: {
            enabled: !!CDPipelineData?.metadata.namespace,
        },
    });

    return useCodebasesByTypeLabelQuery<EnrichedApplicationWithItsImageStreams[]>({
        props: {
            namespace: CDPipelineData?.metadata.namespace,
            codebaseType: CODEBASE_TYPES.APPLICATION,
        },
        options: {
            enabled: !!codebaseImageStreams,
            select: data => {
                return data?.items
                    .map(el => {
                        const {
                            metadata: { name },
                        } = el;

                        if (!CDPipelineApplicationListSet.has(name)) {
                            return;
                        }

                        const codebaseImageStreamsByCodebaseName =
                            codebaseImageStreams?.items.filter(
                                ({ spec: { codebase } }) => codebase === name
                            );

                        const applicationImageStream =
                            codebaseImageStreamsByCodebaseName &&
                            codebaseImageStreamsByCodebaseName.find(el =>
                                CDPipelineInputDockerStreamsSet.has(el.metadata.name)
                            );

                        return {
                            application: el,
                            applicationImageStream,
                            applicationImageStreams: codebaseImageStreamsByCodebaseName,
                            toPromote: CDPipelineApplicationToPromoteListSet.has(name),
                        };
                    })
                    .filter(Boolean);
            },
            ...options,
        },
    });
};
