import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { ConfigMapKubeObject } from '../../../../k8s/groups/default/ConfigMap';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { useTriggerTemplateByNameQuery } from '../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useTriggerTemplateByNameQuery';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
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

const checkApplicationsForStatusChange = (
  oldData: ApplicationKubeObjectInterface[],
  newData: ApplicationKubeObjectInterface[]
) => {
  return oldData.some((oldApp, index) => {
    const newApp = newData[index];
    if (!newApp || !oldApp) return false;
    const oldStatus = oldApp.status?.health?.status;
    const newStatus = newApp.status?.health?.status;
    const oldSync = oldApp.status?.sync?.status;
    const newSync = newApp.status?.sync?.status;
    return oldStatus !== newStatus || oldSync !== newSync;
  });
};

const sortFn = (data: PipelineRunKubeObjectInterface[]) =>
  data.sort(sortKubeObjectByCreationTimestamp);

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const {
    CDPipelineName,
    stageName: stageMetadataName,
    namespace,
  } = useParams<EDPStageDetailsRouteParams>();

  const [stage, error] = StageKubeObject.useGet(stageMetadataName, namespace);

  const stageSpecName = stage?.spec.name;
  const stageTriggerTemplate = stage?.spec.triggerTemplate;
  const stageCleanTemplate = stage?.spec.cleanTemplate;

  const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[]>(null);

  const [newPipelineRunAdded, setNewPipelineRunAdded] = React.useState<boolean>(false);

  const [pipelineRunsError, setPipelineRunsError] = React.useState<ApiError | null>(null);

  const [variablesConfigMap, variablesConfigMapError] = ConfigMapKubeObject.useGet(
    stageMetadataName,
    getDefaultNamespace()
  );

  React.useEffect(() => {
    const cancelStream = PipelineRunKubeObject.streamListByStageName({
      namespace,
      stageMetadataName: stageMetadataName,
      dataHandler: (data) => {
        setPipelineRuns((prev) => {
          const prevListLength = prev?.length || 0;

          if (prev && data.length > prevListLength) {
            setNewPipelineRunAdded(true);
          }

          return sortFn(data);
        });
      },
      errorHandler: (error) => setPipelineRunsError(error as ApiError),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, stageMetadataName]);

  const [gitServers, gitServersError] = GitServerKubeObject.useList();

  const deployPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || pipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(pipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.DEPLOY,
    });
  }, [CDPipelineName, pipelineRuns, stageMetadataName]);

  const cleanPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || pipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(pipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.CLEAN,
    });
  }, [CDPipelineName, pipelineRuns, stageMetadataName]);

  const [applicationList, setApplicationList] =
    React.useState<ApplicationKubeObjectInterface[]>(null);

  React.useEffect(() => {
    if (!stageSpecName) {
      return;
    }

    const cancelStream = ApplicationKubeObject.streamApplicationListByPipelineStageLabel({
      namespace,
      stageSpecName,
      CDPipelineMetadataName: CDPipelineName,
      dataHandler: (newData) => {
        if (!applicationList || checkApplicationsForStatusChange(applicationList, newData)) {
          setApplicationList(newData);
        }
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineName, applicationList, namespace, stageSpecName]);

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
      pipelineRuns: {
        data: pipelineRuns,
        isLoading: pipelineRuns === null,
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
      argoApplications: {
        data: applicationList,
        isLoading: applicationList === null,
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
      variablesConfigMap: {
        data: variablesConfigMap,
        isLoading: variablesConfigMap === null,
        error: variablesConfigMapError,
      },
      newPipelineRunAdded,
      setNewPipelineRunAdded,
    }),
    [
      stage,
      error,
      pipelineRuns,
      pipelineRunsError,
      deployPipelineRuns,
      cleanPipelineRuns,
      applicationList,
      deployPipelineRunTemplate.data,
      deployPipelineRunTemplate.isLoading,
      deployPipelineRunTemplate.error,
      cleanPipelineRunTemplate.data,
      cleanPipelineRunTemplate.isLoading,
      cleanPipelineRunTemplate.error,
      gitServers,
      gitServersError,
      variablesConfigMap,
      variablesConfigMapError,
      newPipelineRunAdded,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
