import React from 'react';
import { ApplicationKubeObjectInterface } from '../../../k8s/Application/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../k8s/EDPCodebaseImageStream/types';
import { useDataContext } from '../providers/Data/hooks';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';

const findPreviousStage = (
    stages: EDPCDPipelineStageKubeObjectInterface[],
    currentStageOrder: number
): EDPCDPipelineStageKubeObjectInterface => {
    return stages.find(({ spec: { order: stageOrder } }) => stageOrder === currentStageOrder - 1);
};

interface UseEnrichedApplicationsProps {
    enrichedApplicationsWithItsImageStreams: EnrichedApplicationWithItsImageStreams[];
    argoApplications: ApplicationKubeObjectInterface[];
}

export const useEnrichedApplicationsWithArgoApplications = ({
    enrichedApplicationsWithItsImageStreams,
    argoApplications,
}: UseEnrichedApplicationsProps) => {
    const { CDPipeline, stages } = useDataContext();
    const { stage } = useDynamicDataContext();

    const inputDockerStreams = CDPipeline?.spec.inputDockerStreams;
    const CDPipelineName = CDPipeline?.metadata.name;
    const stageOrder = stage?.spec.order;

    const normalizedInputDockerStreamNames = inputDockerStreams?.map(el => el.replaceAll('.', '-'));

    const CDPipelineInputDockerStreamsSet = React.useMemo(
        () => new Set<string>(normalizedInputDockerStreamNames),
        [normalizedInputDockerStreamNames]
    );

    const getImageStreamByStageOrder = React.useCallback(
        (
            imageStreams: EDPCodebaseImageStreamKubeObjectInterface[],
            order: number
        ): EDPCodebaseImageStreamKubeObjectInterface => {
            if (order === 0) {
                return (
                    imageStreams &&
                    imageStreams.find(el => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
                );
            }

            const {
                spec: { name: previousStageName },
            } = findPreviousStage(stages.items, order);

            return (
                imageStreams &&
                imageStreams.find(
                    ({ spec: { codebase }, metadata: { name } }) =>
                        name === `${CDPipelineName}-${previousStageName}-${codebase}-verified`
                )
            );
        },
        [CDPipelineInputDockerStreamsSet, CDPipelineName, stages]
    );

    return React.useMemo(() => {
        return (
            enrichedApplicationsWithItsImageStreams &&
            enrichedApplicationsWithItsImageStreams.length &&
            enrichedApplicationsWithItsImageStreams.map(enrichedApplicationWithItsImageStreams => {
                const applicationVerifiedImageStream =
                    enrichedApplicationWithItsImageStreams.applicationImageStreams &&
                    enrichedApplicationWithItsImageStreams.applicationImageStreams.find(
                        ({ spec: { codebase }, metadata: { name } }) =>
                            name === `${CDPipelineName}-${stage?.spec.name}-${codebase}-verified`
                    );

                const argoApplicationByCodebaseName = argoApplications.find(
                    argoApplication =>
                        argoApplication.metadata.labels['app.edp.epam.com/app-name'] ===
                        enrichedApplicationWithItsImageStreams.application.metadata.name
                );

                const imageStreamByStageOrder = getImageStreamByStageOrder(
                    enrichedApplicationWithItsImageStreams.applicationImageStreams,
                    stageOrder
                );

                return {
                    ...enrichedApplicationWithItsImageStreams,
                    applicationImageStream: imageStreamByStageOrder,
                    applicationVerifiedImageStream: applicationVerifiedImageStream,
                    argoApplication: argoApplicationByCodebaseName,
                };
            })
        );
    }, [
        CDPipelineName,
        argoApplications,
        enrichedApplicationsWithItsImageStreams,
        getImageStreamByStageOrder,
        stageOrder,
        stage?.spec.name,
    ]);
};
