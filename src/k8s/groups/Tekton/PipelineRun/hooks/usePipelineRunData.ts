import React from 'react';
import { TaskKubeObjectInterface } from '../../Task/types';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../TaskRun/types';
import { PipelineRunKubeObjectInterface } from '../types';

export const usePipelineRunData = (
  taskRuns: TaskRunKubeObjectInterface[] | null,
  tasks: TaskKubeObjectInterface[] | null,
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

  const taskListByTaskRunNameMap = React.useMemo(() => {
    if (pipelineRun === null || tasks === null) {
      return;
    }

    return pipelineRunTasks.allTasks.reduce((acc, item) => {
      acc.set(
        item.name,
        tasks.find((task) => task.metadata.name === item.taskRef.name)
      );
      return acc;
    }, new Map<string, TaskKubeObjectInterface>());
  }, [pipelineRun, pipelineRunTasks.allTasks, tasks]);

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
      taskListByTaskRunNameMap,
    }),
    [
      pipelineRunFinallyTasksMap,
      pipelineRunMainTasksMap,
      pipelineRunTasks,
      taskListByTaskRunNameMap,
      taskRunListByNameMap,
    ]
  );
};
