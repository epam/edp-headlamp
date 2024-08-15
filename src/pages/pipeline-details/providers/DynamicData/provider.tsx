import React from 'react';
import { useParams } from 'react-router-dom';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { usePipelineRunData } from '../../../../k8s/groups/Tekton/PipelineRun/hooks/usePipelineRunData';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { TaskRunKubeObject } from '../../../../k8s/groups/Tekton/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../../../k8s/groups/Tekton/TaskRun/labels';
import { PipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<PipelineRouteParams>();

  const [pipelineRun, pipelineRunError] = PipelineRunKubeObject.useGet(name, namespace);

  const [taskRuns, taskRunErrors] = TaskRunKubeObject.useList({
    labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${name}`,
  });

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
        data: pipelineRun?.jsonData,
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
