import React from 'react';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../../k8s/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../../k8s/TaskRun/types';

export const usePipelineRunGraphData = (
  taskRuns: TaskRunKubeObjectInterface[],
  pipelineRunTasks: any
) => {
  const PipelineRunTaskRunListByNameMap = React.useMemo(() => {
    if (taskRuns === null || !pipelineRunTasks) {
      return;
    }

    const map = new Map<string, TaskRunKubeObjectInterface>();
    pipelineRunTasks?.forEach((item) => {
      map.set(item.name, item);
    });
    return map;
  }, [taskRuns, pipelineRunTasks]);

  const TaskRunListByNameMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    const map = new Map<string, TaskRunKubeObjectInterface>();
    taskRuns.forEach((item) => {
      map.set(item.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK], item);
    });
    return map;
  }, [taskRuns]);

  const nodes = React.useMemo(() => {
    if (!PipelineRunTaskRunListByNameMap) {
      return null;
    }

    let _nodes = [];

    for (const name of PipelineRunTaskRunListByNameMap.keys()) {
      const TaskRunByName = TaskRunListByNameMap.get(name);
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
  }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

  const edges = React.useMemo(() => {
    if (!PipelineRunTaskRunListByNameMap) {
      return null;
    }

    let _edges = [];

    for (const [name, value] of PipelineRunTaskRunListByNameMap.entries()) {
      const TaskRunByName = TaskRunListByNameMap.get(name);
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

    return _edges;
  }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

  return { nodes, edges };
};
