import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPE } from '../../../../constants/pipelineTypes';
import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import { APPLICATION_LABEL_SELECTOR_APP_NAME } from '../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { ConfigMapKubeObject } from '../../../../k8s/groups/default/ConfigMap';
import { PodKubeObject } from '../../../../k8s/groups/default/Pod';
import { PodKubeObjectInterface } from '../../../../k8s/groups/default/Pod/types';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { TriggerTemplateKubeObject } from '../../../../k8s/groups/Tekton/TriggerTemplate';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME } from '../../../../k8s/groups/Tekton/TriggerTemplate/requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../../../../k8s/groups/Tekton/TriggerTemplate/types';
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
  const {
    CDPipelineName,
    stageName: stageMetadataName,
    namespace,
  } = useParams<EDPStageDetailsRouteParams>();

  const [_stage, error] = StageKubeObject.useGet(stageMetadataName, namespace);
  const stage = _stage as StageKubeObjectInterface | null | undefined;

  const stageIsLoading = stage === null && !error;

  const stageTriggerTemplate = stage?.spec.triggerTemplate;
  const stageCleanTemplate = stage?.spec.cleanTemplate;

  const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[] | null>(
    null
  );

  const [newPipelineRunAdded, setNewPipelineRunAdded] = React.useState<boolean>(false);

  const [pipelineRunsError, setPipelineRunsError] = React.useState<ApiError | null>(null);

  const [variablesConfigMap, variablesConfigMapError] = ConfigMapKubeObject.useGet(
    stageMetadataName,
    namespace
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

  const [gitServers, gitServersError] = GitServerKubeObject.useList({
    namespace,
  });

  const deployPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || pipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(pipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPE.DEPLOY,
    });
  }, [CDPipelineName, pipelineRuns, stageMetadataName]);

  const cleanPipelineRuns = React.useMemo(() => {
    if (!stageMetadataName || !CDPipelineName || pipelineRuns === null) {
      return null; // loading
    }

    return filterByLabels(pipelineRuns, {
      [PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE]: CDPipelineName,
      [PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE]: stageMetadataName,
      [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPE.CLEAN,
    });
  }, [CDPipelineName, pipelineRuns, stageMetadataName]);

  const [applicationList, setApplicationList] = React.useState<
    ApplicationKubeObjectInterface[] | null
  >(null);

  React.useEffect(() => {
    if (stageIsLoading || !stage) {
      return;
    }

    const stageSpecName = stage.spec.name;

    const cancelStream = ApplicationKubeObject.streamApplicationListByPipelineStageLabel({
      namespace,
      stageSpecName,
      CDPipelineMetadataName: CDPipelineName,
      dataHandler: (newData) => {
        setApplicationList(newData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineName, namespace, stage, stageIsLoading]);

  const [stagePods, setStagePods] = React.useState<PodKubeObjectInterface[] | null>(null);

  React.useEffect(() => {
    if (stageIsLoading || !stage) {
      return;
    }

    const stageSpecNamespace = stage.spec.namespace;

    const cancelStream = PodKubeObject.streamList({
      namespace: stageSpecNamespace,
      dataHandler: (newData) => {
        setStagePods(newData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, stage, stageIsLoading]);

  const applicationsListNames = React.useMemo(() => {
    return (applicationList || []).map(
      (app) => app.metadata.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME]
    );
  }, [applicationList]);

  const applicationPodsMap = React.useMemo(() => {
    if (stagePods === null) {
      return null;
    }

    return stagePods.reduce<Record<string, PodKubeObjectInterface[]>>((acc, pod) => {
      const appName = pod.metadata.labels?.['app.kubernetes.io/instance'] || 'unknown';

      if (!applicationsListNames.includes(appName) || appName === 'unknown') {
        return acc;
      }

      if (!acc[appName]) {
        acc[appName] = [];
      }
      //@ts-ignore
      acc[appName].push(new PodKubeObject(pod));

      return acc;
    }, {});
  }, [applicationsListNames, stagePods]);

  const deployPipelineRunTemplate = useQuery<
    TriggerTemplateKubeObjectInterface,
    Error,
    PipelineRunKubeObjectInterface
  >(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME, stageTriggerTemplate],
    () => TriggerTemplateKubeObject.getItemByName(namespace, stageTriggerTemplate!),
    {
      enabled: !!stageTriggerTemplate,
      select: (data) => data.spec.resourcetemplates?.[0],
    }
  );

  const cleanPipelineRunTemplate = useQuery<
    TriggerTemplateKubeObjectInterface,
    Error,
    PipelineRunKubeObjectInterface
  >(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME, stageCleanTemplate],
    () => TriggerTemplateKubeObject.getItemByName(namespace, stageCleanTemplate!),
    {
      enabled: !!stageCleanTemplate,
      select: (data) => data.spec.resourcetemplates?.[0],
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      stage: {
        //@ts-ignore
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
      applicationPodsMap: {
        data: applicationPodsMap,
        isLoading: applicationPodsMap === null,
        error: null,
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
      applicationPodsMap,
      newPipelineRunAdded,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
