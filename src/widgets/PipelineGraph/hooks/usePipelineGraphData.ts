import React from 'react';
import { STATUS_COLOR } from '../../../constants/colors';
import { PipelineKubeObjectInterface } from '../../../k8s/groups/Tekton/Pipeline/types';

export const usePipelineGraphData = (pipeline: PipelineKubeObjectInterface) => {
  const pipelineTasks = React.useMemo(() => {
    const mainTasks = pipeline.spec.tasks || [];
    const finallyTasks = pipeline.spec.finally || [];

    return {
      allTasks: [...mainTasks, ...finallyTasks],
      mainTasks,
      finallyTasks,
    };
  }, [pipeline]);

  const noTasks = React.useMemo(() => {
    return !pipelineTasks.allTasks.length;
  }, [pipelineTasks.allTasks.length]);

  const MainPipelineTasksMap = React.useMemo(() => {
    const map = new Map<string, PipelineKubeObjectInterface>();

    pipelineTasks.mainTasks?.forEach((item) => {
      map.set(item.name, item);
    });
    return map;
  }, [pipelineTasks]);

  const FinallyPipelineTasksMap = React.useMemo(() => {
    const map = new Map<string, PipelineKubeObjectInterface>();
    pipelineTasks.finallyTasks?.forEach((item) => {
      map.set(item.name, item);
    });
    return map;
  }, [pipelineTasks]);

  const allTasksMap = React.useMemo(() => {
    return new Map<string, PipelineKubeObjectInterface>([
      ...MainPipelineTasksMap,
      ...FinallyPipelineTasksMap,
    ]);
  }, [FinallyPipelineTasksMap, MainPipelineTasksMap]);

  const nodes = React.useMemo(() => {
    if (noTasks) {
      return [];
    }

    let _nodes = [];

    for (const name of allTasksMap.keys()) {
      _nodes = [
        {
          id: `task::${name}`,
          height: 40,
          width: 180,
          color: STATUS_COLOR.UNKNOWN,
          data: { name },
        },
        ..._nodes,
      ];
    }

    return _nodes;
  }, [allTasksMap, noTasks]);

  const edges = React.useMemo(() => {
    if (noTasks) {
      return [];
    }

    let _edges = [];

    for (const [name, value] of MainPipelineTasksMap.entries()) {
      if (!value?.runAfter) {
        continue;
      }

      for (const item of value.runAfter) {
        _edges = [
          {
            id: `edge::${name}::${item}`,
            source: `task::${item}`,
            color: STATUS_COLOR.UNKNOWN,
            target: `task::${name}`,
          },
          ..._edges,
        ];
      }
    }

    const lastMainTask = pipelineTasks.mainTasks[pipelineTasks.mainTasks.length - 1];

    for (const [name] of FinallyPipelineTasksMap.entries()) {
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
  }, [FinallyPipelineTasksMap, MainPipelineTasksMap, noTasks, pipelineTasks]);

  return { nodes, edges };
};
