import React from 'react';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../TaskRun/types';
import { PipelineRunKubeObjectInterface } from '../types';

export const usePipelineRunData = (
  taskRuns: TaskRunKubeObjectInterface[] | null,
  pipelineRun: PipelineRunKubeObjectInterface | null
) => {
  const pipelineRunTasks = React.useMemo(() => {
    const mainTasks = pipelineRun?.status?.pipelineSpec?.tasks || [];
    const finallyTasks = pipelineRun?.status?.pipelineSpec?.finally || [];

    return {
      allTasks: [...mainTasks, ...finallyTasks],
      mainTasks,
      finallyTasks,
    };
  }, [pipelineRun]);

  const pipelineRunMainTasksMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    return pipelineRunTasks.mainTasks?.reduce((acc, item) => {
      acc.set(item.name, item);
      return acc;
    }, new Map());
  }, [taskRuns, pipelineRunTasks]);

  const pipelineRunFinallyTasksMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    return pipelineRunTasks.finallyTasks?.reduce((acc, item) => {
      acc.set(item.name, item);
      return acc;
    }, new Map());
  }, [taskRuns, pipelineRunTasks]);

  const taskRunListByNameMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    return taskRuns.reduce((acc, item) => {
      acc.set(item.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK], item);
      return acc;
    }, new Map<string, TaskRunKubeObjectInterface>());
  }, [taskRuns]);

  return React.useMemo(
    () => ({
      pipelineRunTasks,
      pipelineRunMainTasksMap,
      pipelineRunFinallyTasksMap,
      taskRunListByNameMap,
    }),
    [pipelineRunFinallyTasksMap, pipelineRunMainTasksMap, pipelineRunTasks, taskRunListByNameMap]
  );
};
