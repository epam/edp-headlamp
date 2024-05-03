import React from 'react';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { usePipelineRunData } from '../../../k8s/PipelineRun/hooks/usePipelineRunData';
import { PipelineRunKubeObjectInterface } from '../../../k8s/PipelineRun/types';
import { TaskRunKubeObject } from '../../../k8s/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../k8s/TaskRun/types';

export const usePipelineRunGraphData = (
  taskRuns: TaskRunKubeObjectInterface[],
  pipelineRun: PipelineRunKubeObjectInterface
) => {
  const {
    pipelineRunTasks,
    pipelineRunFinallyTasksMap,
    pipelineRunMainTasksMap,
    taskRunListByNameMap,
  } = usePipelineRunData(taskRuns, pipelineRun);

  const isLoading = taskRuns === null || pipelineRun === null;

  const noTasks = React.useMemo(() => {
    return pipelineRunTasks.allTasks.length === 0;
  }, [pipelineRunTasks.allTasks.length]);

  const nodes = React.useMemo(() => {
    if (noTasks || isLoading) {
      return [];
    }

    let _nodes = [];

    for (const name of pipelineRunMainTasksMap.keys()) {
      const TaskRunByName = taskRunListByNameMap.get(name);
      const status = TaskRunKubeObject.parseStatus(TaskRunByName);
      const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
      const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

      _nodes = [
        {
          id: `task::${name}`,
          height: 40,
          width: 180,
          color,
          data: { name, TaskRunByName },
        },
        ..._nodes,
      ];
    }

    for (const name of pipelineRunFinallyTasksMap.keys()) {
      const TaskRunByName = taskRunListByNameMap.get(name);
      const status = TaskRunKubeObject.parseStatus(TaskRunByName);
      const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
      const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

      _nodes = [
        {
          id: `task::${name}`,
          height: 40,
          width: 180,
          color,
          data: { name, TaskRunByName },
        },
        ..._nodes,
      ];
    }

    return _nodes;
  }, [
    noTasks,
    isLoading,
    pipelineRunMainTasksMap,
    taskRunListByNameMap,
    pipelineRunFinallyTasksMap,
  ]);

  const edges = React.useMemo(() => {
    if (noTasks) {
      return [];
    }

    let _edges = [];

    for (const [name, value] of pipelineRunMainTasksMap.entries()) {
      const TaskRunByName = taskRunListByNameMap.get(name);
      const status = TaskRunKubeObject.parseStatus(TaskRunByName);
      const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);

      const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

      if (!value?.runAfter) {
        continue;
      }

      for (const item of value.runAfter) {
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

    for (const [name] of pipelineRunFinallyTasksMap.entries()) {
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
    pipelineRunFinallyTasksMap,
    pipelineRunMainTasksMap,
    pipelineRunTasks.mainTasks,
    taskRunListByNameMap,
  ]);

  return { nodes, edges };
};
