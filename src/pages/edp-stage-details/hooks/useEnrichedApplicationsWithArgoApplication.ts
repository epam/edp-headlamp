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
  const {
    stage: { data: stage, isLoading: isStageLoading },
  } = useDynamicDataContext();

  const inputDockerStreams = CDPipeline?.spec.inputDockerStreams;
  const appsToPromote = CDPipeline?.spec.applicationsToPromote;
  const CDPipelineName = CDPipeline?.metadata.name;
  const stageOrder = stage?.spec.order;

  const normalizedInputDockerStreamNames = inputDockerStreams?.map((el) => el.replaceAll('.', '-'));
  const normalizedAppsToPromoteNames = appsToPromote?.map((el) => el.replaceAll('.', '-'));

  const CDPipelineInputDockerStreamsSet = React.useMemo(
    () => new Set<string>(normalizedInputDockerStreamNames),
    [normalizedInputDockerStreamNames]
  );

  const CDPipelineAppsToPromoteSet = React.useMemo(
    () => new Set<string>(normalizedAppsToPromoteNames),
    [normalizedAppsToPromoteNames]
  );

  const getImageStreamByStageOrder = React.useCallback(
    (
      imageStreams: EDPCodebaseImageStreamKubeObjectInterface[],
      order: number
    ): EDPCodebaseImageStreamKubeObjectInterface => {
      if (order === 0) {
        return (
          imageStreams &&
          imageStreams.find((el) => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
        );
      }

      const previousStage = findPreviousStage(stages.items, order);

      return (
        imageStreams &&
        imageStreams.find(
          ({ spec: { codebase }, metadata: { name } }) =>
            name === `${CDPipelineName}-${previousStage?.spec.name}-${codebase}-verified`
        )
      );
    },
    [CDPipelineInputDockerStreamsSet, CDPipelineName, stages]
  );

  const getImageStreamByToPromoteFlag = React.useCallback(
    (
      imageStreams: EDPCodebaseImageStreamKubeObjectInterface[]
    ): EDPCodebaseImageStreamKubeObjectInterface => {
      return (
        imageStreams &&
        imageStreams.find((el) => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
      );
    },
    [CDPipelineInputDockerStreamsSet]
  );

  return React.useMemo(() => {
    if (isStageLoading) {
      return [];
    }

    return (
      enrichedApplicationsWithItsImageStreams &&
      enrichedApplicationsWithItsImageStreams.length &&
      enrichedApplicationsWithItsImageStreams.map((enrichedApplicationWithItsImageStreams) => {
        const appName = enrichedApplicationWithItsImageStreams.application.metadata.name;
        const isPromote = CDPipelineAppsToPromoteSet.has(appName);

        const applicationVerifiedImageStream =
          enrichedApplicationWithItsImageStreams.applicationImageStreams &&
          enrichedApplicationWithItsImageStreams.applicationImageStreams.find(
            ({ spec: { codebase }, metadata: { name } }) =>
              name === `${CDPipelineName}-${stage?.spec.name}-${codebase}-verified`
          );

        const argoApplicationByCodebaseName = argoApplications.find(
          (argoApplication) =>
            argoApplication.metadata.labels['app.edp.epam.com/app-name'] === appName
        );

        const applicationImageStream = isPromote
          ? getImageStreamByStageOrder(
              enrichedApplicationWithItsImageStreams.applicationImageStreams,
              stageOrder
            )
          : getImageStreamByToPromoteFlag(
              enrichedApplicationWithItsImageStreams.applicationImageStreams
            );

        return {
          ...enrichedApplicationWithItsImageStreams,
          applicationImageStream: applicationImageStream,
          applicationVerifiedImageStream: applicationVerifiedImageStream,
          argoApplication: argoApplicationByCodebaseName,
        };
      })
    );
  }, [
    isStageLoading,
    enrichedApplicationsWithItsImageStreams,
    CDPipelineAppsToPromoteSet,
    argoApplications,
    getImageStreamByToPromoteFlag,
    getImageStreamByStageOrder,
    stageOrder,
    CDPipelineName,
    stage,
  ]);
};
