import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
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

  const {
    taskRunListByNameMap,
    taskListByTaskRunNameMap,
    pipelineRunFinallyTasksMap,
    pipelineRunMainTasksMap,
    pipelineRunTasks,
  } = usePipelineRunData(taskRuns, tasks, pipelineRun);

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
          taskRunListByNameMap,
          taskListByTaskRunNameMap,
          pipelineRunFinallyTasksMap,
          pipelineRunMainTasksMap,
          pipelineRunTasks,
        },
        isLoading:
          taskRuns === null ||
          tasks === null ||
          pipelineRun === null ||
          !pipelineRunTasks.allTasks.length,
        error: taskRunErrors || tasksError || pipelineRunError,
      },
    }),
    [
      pipelineRun,
      pipelineRunError,
      pipelineRunFinallyTasksMap,
      pipelineRunMainTasksMap,
      pipelineRunTasks,
      taskListByTaskRunNameMap,
      taskRunErrors,
      taskRunListByNameMap,
      taskRuns,
      tasks,
      tasksError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
