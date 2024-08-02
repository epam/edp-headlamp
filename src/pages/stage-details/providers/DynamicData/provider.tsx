import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../k8s/groups/ArgoCD/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
  PIPELINE_RUN_LABEL_SELECTOR_STAGE,
} from '../../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { useTriggerTemplateByNameQuery } from '../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useTriggerTemplateByNameQuery';
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

  const [stage, error] = StageKubeObject.useGet(stageName, namespace);

  const stageSpecName = stage?.spec.name;
  const stageMetadataName = stage?.metadata.name;
  const stageTriggerTemplate = stage?.spec.triggerTemplate;
  const stageCleanTemplate = stage?.spec.cleanTemplate;

  const [pipelineRuns, pipelineRunsError] = PipelineRunKubeObject.useList();
  const [gitServers, gitServersError] = GitServerKubeObject.useList();

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

  const cleanPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.CLEAN,
    });
  }, [CDPipelineName, sortedPipelineRuns, stageMetadataName]);

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

  const cleanPipelineRunTemplate = useTriggerTemplateByNameQuery({
    props: {
      name: stageCleanTemplate,
    },
    options: {
      enabled: !!stageCleanTemplate,
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
        data: autotestPipelineRuns,
        isLoading: autotestPipelineRuns === null,
        error: pipelineRunsError,
      },
      deployPipelineRuns: {
        data: deployPipelineRuns,
        isLoading: deployPipelineRuns === null,
        error: pipelineRunsError,
      },
      cleanPipelineRuns: {
        data: cleanPipelineRuns,
        isLoading: cleanPipelineRuns === null,
        error: pipelineRunsError,
      },
      autotestRunnerPipelineRuns: {
        data: autotestRunnerPipelineRuns,
        isLoading: autotestRunnerPipelineRuns === null,
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
      cleanPipelineRunTemplate: {
        data: cleanPipelineRunTemplate.data,
        isLoading: cleanPipelineRunTemplate.isLoading,
        error: cleanPipelineRunTemplate.error as ApiError,
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
      autotestPipelineRuns,
      pipelineRunsError,
      deployPipelineRuns,
      cleanPipelineRuns,
      autotestRunnerPipelineRuns,
      argoApplications,
      deployPipelineRunTemplate.data,
      deployPipelineRunTemplate.isLoading,
      deployPipelineRunTemplate.error,
      cleanPipelineRunTemplate.data,
      cleanPipelineRunTemplate.isLoading,
      cleanPipelineRunTemplate.error,
      gitServers,
      gitServersError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
