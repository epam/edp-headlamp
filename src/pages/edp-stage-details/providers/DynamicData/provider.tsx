import React from 'react';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { useStreamAutotestPipelineRunList } from '../../../../k8s/PipelineRun/hooks/useStreamAutotestPipelineRunList';
import { useStreamAutotestRunnerPipelineRunList } from '../../../../k8s/PipelineRun/hooks/useStreamAutotestRunnerPipelineRunList';
import { useStreamPipelineRunListByTypeAndPipelineNameLabels } from '../../../../k8s/PipelineRun/hooks/useStreamPipelineRunListByTypeAndPipelineNameLabels';
import { useStreamStagePipelineRunList } from '../../../../k8s/PipelineRun/hooks/useStreamStagePipelineRunList';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { useTriggerTemplateByNameQuery } from '../../../../k8s/TriggerTemplate/hooks/useTriggerTemplateByNameQuery';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { EDPStageDetailsRouteParams } from '../../types';
import { DynamicDataContext } from './context';

const sortFn = (data: PipelineRunKubeObjectInterface[]) =>
  data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { CDPipelineName, stageName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const [stage, error] = EDPCDPipelineStageKubeObject.useGet(stageName, namespace);

  const stageSpecName = stage?.spec.name;
  const stageMetadataName = stage?.metadata.name;
  const stageTriggerTemplate = stage?.spec.triggerTemplate;

  const stageDeployPipelineRuns = useStreamStagePipelineRunList({
    namespace,
    cdPipelineName: CDPipelineName,
    pipelineType: PIPELINE_TYPES.DEPLOY,
    stageMetadataName,
    select: sortFn,
  });

  const latestTenDeployPipelineRuns = useStreamPipelineRunListByTypeAndPipelineNameLabels({
    namespace,
    pipelineType: PIPELINE_TYPES.DEPLOY,
    stageMetadataName,
    select: sortFn,
  });

  const latestAutotestRunnerPipelineRuns = useStreamAutotestRunnerPipelineRunList({
    namespace,
    stageSpecName,
    CDPipelineMetadataName: CDPipelineName,
    select: sortFn,
  });

  const latestAutotestRunnerPipelineRunName = React.useMemo(
    () => latestAutotestRunnerPipelineRuns?.[0]?.metadata.name,
    [latestAutotestRunnerPipelineRuns]
  );

  const latestTenAutotestPipelineRuns = useStreamAutotestPipelineRunList({
    namespace,
    stageSpecName,
    CDPipelineMetadataName: CDPipelineName,
    parentPipelineRunName: latestAutotestRunnerPipelineRunName,
    select: sortFn,
  });

  const argoApplications = useStreamApplicationListByPipelineStageLabel({
    namespace,
    stageSpecName,
    CDPipelineMetadataName: CDPipelineName,
  });

  const deployPipelineRunTemplate = useTriggerTemplateByNameQuery({
    props: {
      name: stageTriggerTemplate,
    },
    options: {
      select: (data) => data.spec.resourcetemplates?.[0],
    },
  });

  const DataContextValue = React.useMemo(
    () => ({
      stage: {
        data: stage?.jsonData,
        isLoading: stage === null,
        error,
      },
      autotestPipelineRuns: {
        data: latestTenAutotestPipelineRuns,
        isLoading: latestTenAutotestPipelineRuns === null,
        error: null,
      },
      deployPipelineRuns: {
        data: latestTenDeployPipelineRuns,
        isLoading: latestTenDeployPipelineRuns === null,
        error: null,
      },
      autotestRunnerPipelineRuns: {
        data: latestAutotestRunnerPipelineRuns,
        isLoading: latestAutotestRunnerPipelineRuns === null,
        error: null,
      },
      argoApplications: {
        data: argoApplications,
        isLoading: argoApplications === null,
        error: null,
      },
      deployPipelineRunTemplate: {
        data: deployPipelineRunTemplate.data,
        isLoading: deployPipelineRunTemplate.isLoading,
        error: deployPipelineRunTemplate.error,
      },
      stageDeployPipelineRuns: {
        data: stageDeployPipelineRuns,
        isLoading: stageDeployPipelineRuns === null,
        error: null,
      },
    }),
    [
      stage,
      error,
      latestTenAutotestPipelineRuns,
      latestTenDeployPipelineRuns,
      latestAutotestRunnerPipelineRuns,
      argoApplications,
      deployPipelineRunTemplate,
      stageDeployPipelineRuns,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
