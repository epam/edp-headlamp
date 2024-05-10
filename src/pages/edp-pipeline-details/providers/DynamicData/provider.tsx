import React from 'react';
import { useParams } from 'react-router-dom';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { usePipelineRunData } from '../../../../k8s/PipelineRun/hooks/usePipelineRunData';
import { TaskRunKubeObject } from '../../../../k8s/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../../../k8s/TaskRun/labels';
import { PipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<PipelineRouteParams>();

  const [pipelineRun, pipelineRunError] = PipelineRunKubeObject.useGet(name, namespace);

  const [taskRuns, taskRunErrors] = TaskRunKubeObject.useList({
    labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${name}`,
  });

  const {
    taskRunListByNameMap,
    pipelineRunFinallyTasksMap,
    pipelineRunMainTasksMap,
    pipelineRunTasks,
  } = usePipelineRunData(taskRuns, pipelineRun);

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
          pipelineRunFinallyTasksMap,
          pipelineRunMainTasksMap,
          pipelineRunTasks,
        },
        isLoading: taskRuns === null || pipelineRun === null || !pipelineRunTasks.allTasks.length,
        error: taskRunErrors || pipelineRunError,
      },
    }),
    [
      pipelineRun,
      pipelineRunError,
      pipelineRunFinallyTasksMap,
      pipelineRunMainTasksMap,
      pipelineRunTasks,
      taskRunErrors,
      taskRunListByNameMap,
      taskRuns,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
