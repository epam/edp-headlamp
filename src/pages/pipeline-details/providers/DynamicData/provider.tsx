import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ApprovalTaskKubeObject } from '../../../../k8s/groups/EDP/ApprovalTask';
import { ApprovalTaskKubeObjectInterface } from '../../../../k8s/groups/EDP/ApprovalTask/types';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { usePipelineRunData } from '../../../../k8s/groups/Tekton/PipelineRun/hooks/usePipelineRunData';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { TaskRunKubeObject } from '../../../../k8s/groups/Tekton/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/TaskRun/types';
import { PipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<PipelineRouteParams>();

  const [pipelineRun, setPipelineRun] = React.useState<PipelineRunKubeObjectInterface>(null);
  const [pipelineRunError, setPipelineRunError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
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
  }, [namespace, name]);

  const [taskRuns, setTaskRuns] = React.useState<TaskRunKubeObjectInterface[]>(null);
  const [taskRunErrors, setTaskRunErrors] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
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
  }, [namespace, name]);

  const [tasks, tasksError] = TaskKubeObject.useList();

  const [approvalTasks, setApprovalTasks] = React.useState<ApprovalTaskKubeObjectInterface[]>(null);
  const [approvalTasksError, setApprovalTasksError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
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
  }, [namespace, name]);

  const { pipelineRunTasks, pipelineRunTasksByNameMap } = usePipelineRunData({
    taskRuns,
    tasks,
    pipelineRun,
    approvalTasks,
  });

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
    }),
    [
      approvalTasksError,
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
