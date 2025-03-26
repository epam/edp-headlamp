import React from 'react';
import { ApplicationKubeObjectInterface } from '../../../k8s/groups/ArgoCD/Application/types';
import { CDPipelineKubeObjectInterface } from '../../../k8s/groups/EDP/CDPipeline/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../k8s/groups/EDP/Codebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { CodebaseImageStreamKubeObjectInterface } from '../../../k8s/groups/EDP/CodebaseImageStream/types';
import { StageKubeObjectInterface } from '../../../k8s/groups/EDP/Stage/types';
import { DataProviderValue } from '../../../types/pages';

const findPreviousStage = (
  stages: StageKubeObjectInterface[],
  currentStageOrder: number
): StageKubeObjectInterface | undefined => {
  return stages.find(({ spec: { order: stageOrder } }) => stageOrder === currentStageOrder - 1);
};

export const useEnrichedApplicationsWithArgoApplications = ({
  CDPipeline,
  stages,
  enrichedApplicationsWithItsImageStreams,
  stage,
  argoApplications,
}: {
  CDPipeline: DataProviderValue<CDPipelineKubeObjectInterface>;
  stages: DataProviderValue<StageKubeObjectInterface[]>;
  enrichedApplicationsWithItsImageStreams: DataProviderValue<
    EnrichedApplicationWithItsImageStreams[]
  >;
  stage: DataProviderValue<StageKubeObjectInterface>;
  argoApplications: DataProviderValue<ApplicationKubeObjectInterface[]>;
}) => {
  const inputDockerStreams = CDPipeline.data?.spec.inputDockerStreams;
  const appsToPromote = CDPipeline.data?.spec.applicationsToPromote;
  const CDPipelineName = CDPipeline.data?.metadata.name;
  const stageOrder = stage.data?.spec.order;

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
      imageStreams: CodebaseImageStreamKubeObjectInterface[],
      order: number
    ): CodebaseImageStreamKubeObjectInterface | undefined => {
      if (order === 0) {
        return (
          imageStreams &&
          imageStreams.find((el) => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
        );
      }

      const previousStage = findPreviousStage(stages.data, order);

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
      imageStreams: CodebaseImageStreamKubeObjectInterface[]
    ): CodebaseImageStreamKubeObjectInterface | undefined => {
      return (
        imageStreams &&
        imageStreams.find((el) => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
      );
    },
    [CDPipelineInputDockerStreamsSet]
  );

  return React.useMemo(() => {
    if (
      stage.isLoading ||
      argoApplications.isLoading ||
      !enrichedApplicationsWithItsImageStreams.data ||
      !enrichedApplicationsWithItsImageStreams.data.length
    ) {
      return null;
    }

    return enrichedApplicationsWithItsImageStreams.data.map(
      (enrichedApplicationWithItsImageStreams) => {
        const appName = enrichedApplicationWithItsImageStreams.application.metadata.name;
        const isPromote = CDPipelineAppsToPromoteSet.has(appName);

        const applicationVerifiedImageStream =
          enrichedApplicationWithItsImageStreams.applicationImageStreams &&
          enrichedApplicationWithItsImageStreams.applicationImageStreams.find(
            ({ spec: { codebase }, metadata: { name } }) =>
              name === `${CDPipelineName}-${stage.data?.spec.name}-${codebase}-verified`
          );

        const argoApplicationByCodebaseName = argoApplications.data.find(
          (argoApplication) =>
            argoApplication.metadata?.labels?.['app.edp.epam.com/app-name'] === appName
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
      }
    );
  }, [
    stage.isLoading,
    stage.data?.spec.name,
    argoApplications.isLoading,
    argoApplications.data,
    enrichedApplicationsWithItsImageStreams.data,
    CDPipelineAppsToPromoteSet,
    getImageStreamByStageOrder,
    stageOrder,
    getImageStreamByToPromoteFlag,
    CDPipelineName,
  ]);
};
