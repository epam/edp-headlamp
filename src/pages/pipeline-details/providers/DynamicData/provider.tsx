import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../k8s/groups/default/ConfigMap/constants';
import { useEDPConfigMapQuery } from '../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { ApprovalTaskKubeObject } from '../../../../k8s/groups/EDP/ApprovalTask';
import { ApprovalTaskKubeObjectInterface } from '../../../../k8s/groups/EDP/ApprovalTask/types';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { usePipelineRunData } from '../../../../k8s/groups/Tekton/PipelineRun/hooks/usePipelineRunData';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { TaskRunKubeObject } from '../../../../k8s/groups/Tekton/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/TaskRun/types';
import { ApiServiceBase, OpensearchApiService } from '../../../../services/api';
import { PipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';
import { OpensearchResponse } from './types';

function getToken(cluster: string) {
  return JSON.parse(localStorage.tokens || '{}')?.[cluster];
}

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<PipelineRouteParams>();

  const [pipelineRun, setPipelineRun] = React.useState<PipelineRunKubeObjectInterface>(null);
  const [pipelineRunError, setPipelineRunError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
    if (pipelineRunError) {
      return;
    }

    const cancelStream = PipelineRunKubeObject.streamItem({
      namespace,
      name,
      dataHandler: (data) => {
        setPipelineRun(data);
      },
      errorHandler: (error) => setPipelineRunError(error as ApiError),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, name, pipelineRunError]);

  const [taskRuns, setTaskRuns] = React.useState<TaskRunKubeObjectInterface[]>(null);
  const [taskRunErrors, setTaskRunErrors] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
    if (pipelineRunError) {
      return;
    }

    const cancelStream = TaskRunKubeObject.streamListByPipelineRunName({
      namespace,
      parentPipelineRunName: name,
      dataHandler: (data) => {
        setTaskRuns(data);
      },
      errorHandler: (error) => setTaskRunErrors(error as ApiError),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, name, pipelineRunError]);

  const [tasks, tasksError] = TaskKubeObject.useList();

  const [approvalTasks, setApprovalTasks] = React.useState<ApprovalTaskKubeObjectInterface[]>(null);
  const [approvalTasksError, setApprovalTasksError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
    if (pipelineRunError) {
      return;
    }

    const cancelStream = ApprovalTaskKubeObject.streamListByPipelineRunName({
      namespace,
      pipelineRunName: name,
      dataHandler: (data) => {
        setApprovalTasks(data);
      },
      errorHandler: (error) => setApprovalTasksError(error as ApiError),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, name, pipelineRunError]);

  const { pipelineRunTasks, pipelineRunTasksByNameMap } = usePipelineRunData({
    taskRuns,
    tasks,
    pipelineRun,
    approvalTasks,
  });

  const { data: EDPConfigMap } = useEDPConfigMapQuery({
    props: {
      name: EDP_CONFIG_CONFIG_MAP_NAME,
    },
    options: {
      enabled: !pipelineRun && !!pipelineRunError,
    },
  });

  const cluster = Utils.getCluster();
  const token = getToken(cluster);
  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const apiService = new ApiServiceBase(apiGatewayUrl, token);

  const opensearchApiService = new OpensearchApiService(apiService);

  const {
    data: fallbackLogs,
    isLoading: isFallbackLogsLoading,
    error: fallbackLogsError,
  } = useQuery<OpensearchResponse>(
    ['openSearchLogs', namespace, name],
    () =>
      apiService.createFetcher(
        opensearchApiService.getLogsEndpoint(),
        JSON.stringify({
          _source: ['log'],
          query: {
            bool: {
              must: [
                {
                  match_phrase: {
                    'kubernetes.namespace_name': namespace,
                  },
                },
                {
                  match_phrase: {
                    'kubernetes.labels.tekton_dev/pipelineRun': name,
                  },
                },
                {
                  range: {
                    '@timestamp': {
                      gte: 'now-1d',
                      lte: 'now',
                    },
                  },
                },
              ],
            },
          },
          sort: [
            {
              '@timestamp': {
                order: 'asc',
              },
            },
          ],
          size: 500,
        }),
        'POST'
      ),
    {
      enabled: !!apiService.apiBaseURL,
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      pipelineRun: {
        data: pipelineRun,
        error: pipelineRunError,
        isLoading: pipelineRun === null,
      },
      taskRuns: {
        data: taskRuns,
        error: taskRunErrors,
        isLoading: taskRuns === null,
      },
      pipelineRunData: {
        data: {
          pipelineRunTasks,
          pipelineRunTasksByNameMap,
        },
        isLoading:
          taskRuns === null ||
          tasks === null ||
          pipelineRun === null ||
          !pipelineRunTasks.allTasks.length,
        error: taskRunErrors || tasksError || pipelineRunError || approvalTasksError,
      },
      fallbackLogs: {
        data: fallbackLogs,
        isLoading: isFallbackLogsLoading,
        error: fallbackLogsError as ApiError,
      },
    }),
    [
      approvalTasksError,
      fallbackLogs,
      fallbackLogsError,
      isFallbackLogsLoading,
      pipelineRun,
      pipelineRunError,
      pipelineRunTasks,
      pipelineRunTasksByNameMap,
      taskRunErrors,
      taskRuns,
      tasks,
      tasksError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
