import React from 'react';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../k8s/PipelineRun/types';
import { TaskRunKubeObject } from '../../../k8s/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../../k8s/TaskRun/types';

export const usePipelineRunGraphData = (
  taskRuns: TaskRunKubeObjectInterface[],
  pipelineRun: PipelineRunKubeObjectInterface
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

  const noTasks = React.useMemo(() => {
    return !pipelineRunTasks.allTasks.length || taskRuns === null;
  }, [pipelineRunTasks.allTasks.length, taskRuns]);

  const MainPipelineRunTasksMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    const map = new Map<string, TaskRunKubeObjectInterface>();

    pipelineRunTasks.mainTasks?.forEach((item) => {
      map.set(item.name, item);
    });
    return map;
  }, [taskRuns, pipelineRunTasks]);

  const FinallyPipelineRunTasksMap = React.useMemo(() => {
    if (taskRuns === null) {
      return;
    }

    const map = new Map<string, TaskRunKubeObjectInterface>();
    pipelineRunTasks.finallyTasks?.forEach((item) => {
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
    if (noTasks) {
      return [];
    }

    let _nodes = [];

    for (const name of MainPipelineRunTasksMap.keys()) {
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

    for (const name of FinallyPipelineRunTasksMap.keys()) {
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
  }, [FinallyPipelineRunTasksMap, MainPipelineRunTasksMap, TaskRunListByNameMap, noTasks]);

  const edges = React.useMemo(() => {
    if (noTasks) {
      return [];
    }

    let _edges = [];

    for (const [name, value] of MainPipelineRunTasksMap.entries()) {
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

    const lastMainTask = pipelineRunTasks.mainTasks[pipelineRunTasks.mainTasks.length - 1];

    for (const [name] of FinallyPipelineRunTasksMap.entries()) {
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
    FinallyPipelineRunTasksMap,
    MainPipelineRunTasksMap,
    TaskRunListByNameMap,
    noTasks,
    pipelineRunTasks,
  ]);

  return { nodes, edges };
};
