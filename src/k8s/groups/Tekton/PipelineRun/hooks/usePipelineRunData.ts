import React from 'react';
import { APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_TASK } from '../../../EDP/ApprovalTask/labels';
import { ApprovalTaskKubeObjectInterface } from '../../../EDP/ApprovalTask/types';
import { TaskKubeObjectInterface } from '../../Task/types';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../TaskRun/types';
import { PipelineRunData, PipelineRunKubeObjectInterface } from '../types';

export const usePipelineRunData = ({
  taskRuns,
  tasks,
  pipelineRun,
  approvalTasks,
}: {
  taskRuns: TaskRunKubeObjectInterface[] | null;
  tasks: TaskKubeObjectInterface[] | null;
  pipelineRun: PipelineRunKubeObjectInterface | null;
  approvalTasks: ApprovalTaskKubeObjectInterface[] | null;
}): PipelineRunData => {
  const pipelineRunTasks = React.useMemo(() => {
    const mainTasks = pipelineRun?.status?.pipelineSpec?.tasks || [];
    const finallyTasks = pipelineRun?.status?.pipelineSpec?.finally || [];

    return {
      allTasks: [...mainTasks, ...finallyTasks],
      mainTasks,
      finallyTasks,
    };
  }, [pipelineRun]);

  const pipelineRunTasksByNameMap = React.useMemo(() => {
    if (taskRuns === null || tasks === null || approvalTasks === null) {
      return;
    }

    return pipelineRunTasks.allTasks?.reduce((acc, item) => {
      acc.set(item.name, {
        pipelineRunTask: item,
        task: tasks.find((task) => task.metadata.name === item.taskRef.name),
        taskRun: taskRuns.find(
          (taskRun) => taskRun.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK] === item.name
        ),
        approvalTask: approvalTasks?.find(
          (approvalTask) =>
            approvalTask.metadata.labels[APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_TASK] === item.name
        ),
      });
      return acc;
    }, new Map());
  }, [taskRuns, tasks, approvalTasks, pipelineRunTasks.allTasks]);

  return React.useMemo(
    () => ({
      pipelineRunTasks,
      pipelineRunTasksByNameMap,
    }),
    [pipelineRunTasks, pipelineRunTasksByNameMap]
  );
};
