import React from 'react';
import { ApprovalTaskKubeObject } from '../../../k8s/groups/EDP/ApprovalTask';
import { APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_RUN } from '../../../k8s/groups/EDP/ApprovalTask/labels';
import { ApprovalTaskKubeObjectInterface } from '../../../k8s/groups/EDP/ApprovalTask/types';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { usePipelineRunData } from '../../../k8s/groups/Tekton/PipelineRun/hooks/usePipelineRunData';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskKubeObject } from '../../../k8s/groups/Tekton/Task';
import { TaskRunKubeObject } from '../../../k8s/groups/Tekton/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../k8s/groups/Tekton/TaskRun/types';

const getTaskStatusData = (
  approvalTask: ApprovalTaskKubeObjectInterface,
  taskRun: TaskRunKubeObjectInterface
) => {
  if (approvalTask) {
    return ApprovalTaskKubeObject.getStatusIcon(approvalTask?.spec?.action);
  }

  const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
  const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

  return TaskRunKubeObject.getStatusIcon(taskRunStatus, taskRunReason);
};

export const usePipelineRunGraphData = (
  taskRuns: TaskRunKubeObjectInterface[],
  pipelineRun: PipelineRunKubeObjectInterface
) => {
  const [tasks] = TaskKubeObject.useList();

  const [approvalTasks] = ApprovalTaskKubeObject.useList({
    labelSelector: `${APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_RUN}=${pipelineRun.metadata.name}`,
  });

  const { pipelineRunTasks, pipelineRunTasksByNameMap } = usePipelineRunData({
    taskRuns,
    tasks,
    pipelineRun,
    approvalTasks,
  });

  const isLoading =
    taskRuns === null || pipelineRun === null || tasks === null || approvalTasks === null;

  const noTasks = React.useMemo(() => {
    return pipelineRunTasks.allTasks.length === 0 || !pipelineRunTasksByNameMap;
  }, [pipelineRunTasks.allTasks.length, pipelineRunTasksByNameMap]);

  const nodes = React.useMemo(() => {
    if (noTasks || isLoading) {
      return [];
    }

    let _nodes = [];

    for (const [name, value] of pipelineRunTasksByNameMap.entries()) {
      const taskRun = value.taskRun;
      const approvalTask = value.approvalTask;
      const [, color] = getTaskStatusData(approvalTask, taskRun);

      _nodes = [
        {
          id: `task::${name}`,
          height: 40,
          width: 180,
          color,
          data: { name, taskRun, approvalTask },
        },
        ..._nodes,
      ];
    }

    return _nodes;
  }, [noTasks, isLoading, pipelineRunTasksByNameMap]);

  const edges = React.useMemo(() => {
    if (noTasks) {
      return [];
    }

    let _edges = [];

    for (const [name, value] of pipelineRunTasksByNameMap.entries()) {
      const taskRun = value.taskRun;
      const status = TaskRunKubeObject.parseStatus(taskRun);
      const reason = TaskRunKubeObject.parseStatusReason(taskRun);
      const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

      if (!value?.pipelineRunTask?.runAfter) {
        continue;
      }

      for (const item of value.pipelineRunTask.runAfter) {
        _edges = [
          {
            id: `edge::${name}::${item}`,
            source: `task::${item}`,
            color,
            target: `task::${name}`,
          },
          ..._edges,
        ];
      }
    }

    const lastMainTask = pipelineRunTasks.mainTasks[pipelineRunTasks.mainTasks.length - 1];

    for (const item of pipelineRunTasks.finallyTasks) {
      const name = item.name;

      _edges = [
        {
          id: `edge::${name}::${lastMainTask.name}`,
          source: `task::${lastMainTask.name}`,
          color: 'transparent',
          noArrow: true,
          target: `task::${name}`,
        },
        ..._edges,
      ];
    }

    return _edges;
  }, [
    noTasks,
    pipelineRunTasks.finallyTasks,
    pipelineRunTasks.mainTasks,
    pipelineRunTasksByNameMap,
  ]);

  return { nodes, edges };
};
