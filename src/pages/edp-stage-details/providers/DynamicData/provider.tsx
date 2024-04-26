import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
  PIPELINE_RUN_LABEL_SELECTOR_STAGE,
} from '../../../../k8s/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { useTriggerTemplateByNameQuery } from '../../../../k8s/TriggerTemplate/hooks/useTriggerTemplateByNameQuery';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { EDPStageDetailsRouteParams } from '../../types';
import { DynamicDataContext } from './context';

const filterByLabels = (items: KubeObjectInterface[], labels: Record<string, string>) => {
  return items.filter((item) =>
    Object.entries(labels).every((label) => {
      return item.metadata.labels?.[label[0]] === label[1];
    })
  );
};

const sortFn = (data: PipelineRunKubeObjectInterface[]) =>
  data.sort(sortKubeObjectByCreationTimestamp);

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { CDPipelineName, stageName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const [stage, error] = EDPCDPipelineStageKubeObject.useGet(stageName, namespace);

  const stageSpecName = stage?.spec.name;
  const stageMetadataName = stage?.metadata.name;
  const stageTriggerTemplate = stage?.spec.triggerTemplate;

  const [pipelineRuns, pipelineRunsError] = PipelineRunKubeObject.useList();
  const [gitServers, gitServersError] = EDPGitServerKubeObject.useList();

  const sortedPipelineRuns = React.useMemo(
    () => (pipelineRuns === null ? null : sortFn(pipelineRuns)),
    [pipelineRuns]
  );

  const deployPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.DEPLOY,
    });
  }, [CDPipelineName, sortedPipelineRuns, stageMetadataName]);
  const latestTenDeployPipelineRuns = React.useMemo(
    () => (deployPipelineRuns === null ? null : deployPipelineRuns?.slice(0, 10)),
    [deployPipelineRuns]
  );

  const autotestRunnerPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_STAGE]: stageSpecName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.AUTOTEST_RUNNER,
    });
  }, [CDPipelineName, sortedPipelineRuns, stageMetadataName, stageSpecName]);
  const latestTenAutotestRunnerPipelineRuns = React.useMemo(
    () => (autotestRunnerPipelineRuns === null ? null : autotestRunnerPipelineRuns?.slice(0, 10)),
    [autotestRunnerPipelineRuns]
  );

  const autotestPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    const latestAutotestRunnerPipelineRunName = autotestRunnerPipelineRuns?.[0]?.metadata.name;

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_STAGE]: stageSpecName,
      [PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN]: latestAutotestRunnerPipelineRunName,
    });
  }, [
    CDPipelineName,
    autotestRunnerPipelineRuns,
    sortedPipelineRuns,
    stageMetadataName,
    stageSpecName,
  ]);
  const latestTenAutotestPipelineRuns = React.useMemo(
    () => (autotestPipelineRuns === null ? null : autotestPipelineRuns?.slice(0, 10)),
    [autotestPipelineRuns]
  );

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
      enabled: !!stageTriggerTemplate,
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
        error: pipelineRunsError,
      },
      deployPipelineRuns: {
        data: latestTenDeployPipelineRuns,
        isLoading: latestTenDeployPipelineRuns === null,
        error: pipelineRunsError,
      },
      autotestRunnerPipelineRuns: {
        data: latestTenAutotestRunnerPipelineRuns,
        isLoading: latestTenAutotestRunnerPipelineRuns === null,
        error: pipelineRunsError,
      },
      argoApplications: {
        data: argoApplications,
        isLoading: argoApplications === null,
        error: null,
      },
      deployPipelineRunTemplate: {
        data: deployPipelineRunTemplate.data,
        isLoading: deployPipelineRunTemplate.isLoading,
        error: deployPipelineRunTemplate.error as ApiError,
      },
      gitServers: {
        data: gitServers,
        isLoading: gitServers === null,
        error: gitServersError,
      },
    }),
    [
      stage,
      error,
      latestTenAutotestPipelineRuns,
      pipelineRunsError,
      latestTenDeployPipelineRuns,
      latestTenAutotestRunnerPipelineRuns,
      argoApplications,
      deployPipelineRunTemplate.data,
      deployPipelineRunTemplate.isLoading,
      deployPipelineRunTemplate.error,
      gitServers,
      gitServersError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
