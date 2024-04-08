import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
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
  data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { CDPipelineName, stageName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const [stage, error] = EDPCDPipelineStageKubeObject.useGet(stageName, namespace);

  const stageSpecName = stage?.spec.name;
  const stageMetadataName = stage?.metadata.name;
  const stageTriggerTemplate = stage?.spec.triggerTemplate;

  const [pipelineRuns] = PipelineRunKubeObject.useList();

  const sortedPipelineRuns = React.useMemo(() => {
    if (pipelineRuns === null) {
      return null; //loading
    }

    return sortFn(pipelineRuns);
  }, [pipelineRuns]);

  const latestTenDeployPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.DEPLOY,
    });
  }, [CDPipelineName, sortedPipelineRuns, stageMetadataName]);

  const latestTenAutotestRunnerPipelineRuns = React.useMemo(() => {
    if (!stageSpecName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_STAGE]: stageSpecName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.AUTOTEST_RUNNER,
    });
  }, [CDPipelineName, sortedPipelineRuns, stageSpecName]);

  const latestAutotestRunnerPipelineRunName = React.useMemo(
    () => latestTenAutotestRunnerPipelineRuns?.[0]?.metadata.name,
    [latestTenAutotestRunnerPipelineRuns]
  );

  const latestTenAutotestPipelineRuns = React.useMemo(() => {
    if (!stageSpecName || !CDPipelineName || sortedPipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(sortedPipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_STAGE]: stageSpecName,
      [PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN]: latestAutotestRunnerPipelineRunName,
    });
  }, [CDPipelineName, latestAutotestRunnerPipelineRunName, sortedPipelineRuns, stageSpecName]);

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
        error: null,
      },
      deployPipelineRuns: {
        data: latestTenDeployPipelineRuns,
        isLoading: latestTenDeployPipelineRuns === null,
        error: null,
      },
      autotestRunnerPipelineRuns: {
        data: latestTenAutotestRunnerPipelineRuns,
        isLoading: latestTenAutotestRunnerPipelineRuns === null,
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
        error: deployPipelineRunTemplate.error as ApiError,
      },
    }),
    [
      stage,
      error,
      latestTenAutotestPipelineRuns,
      latestTenDeployPipelineRuns,
      latestTenAutotestRunnerPipelineRuns,
      argoApplications,
      deployPipelineRunTemplate,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
