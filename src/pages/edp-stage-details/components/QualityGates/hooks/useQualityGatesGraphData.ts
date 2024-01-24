import React from 'react';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../../../../k8s/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../../../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../../../../k8s/TaskRun/types';
import { EnrichedQualityGateWithAutotestPipelineRun } from '../../../types';

export const useQualityGatesGraphData = (
  taskRunList: TaskRunKubeObjectInterface[],
  enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[]
) => {
  const _enrichedQualityGatesWithPipelineRuns = React.useMemo(
    () => enrichedQualityGatesWithPipelineRuns || [],
    [enrichedQualityGatesWithPipelineRuns]
  );

  const extraNodes = React.useMemo(
    () =>
      _enrichedQualityGatesWithPipelineRuns.map((el, idx) => {
        const status = PipelineRunKubeObject.parseStatus(el?.autotestPipelineRun);
        const reason = PipelineRunKubeObject.parseStatusReason(el?.autotestPipelineRun);

        const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

        return {
          id: `node::${idx}`,
          color,
          height: 35,
          width: 150,
          data: {
            resourceType: 'pipelinerun',
            resource: el.autotestPipelineRun,
            title: el.qualityGate.stepName,
          },
        };
      }),
    [_enrichedQualityGatesWithPipelineRuns]
  );

  const nodes = React.useMemo(() => {
    const initAutotestTaskRun =
      taskRunList &&
      taskRunList.length &&
      taskRunList.find(
        (el) => el.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK] === 'init-autotest'
      );

    const initAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(initAutotestTaskRun);
    const initAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(initAutotestTaskRun);

    const [, initAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
      initAutotestTaskRunStatus,
      initAutotestTaskRunReason
    );

    const promoteTaskRun =
      taskRunList &&
      taskRunList.length &&
      taskRunList.find(
        (el) => el.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK] === 'promote-images'
      );

    const promoteAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(promoteTaskRun);
    const promoteAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(promoteTaskRun);

    const [, promoteAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
      promoteAutotestTaskRunStatus,
      promoteAutotestTaskRunReason
    );

    return [
      {
        id: 'node::prepare',
        color: initAutotestTaskRunStatusColor,
        height: 35,
        width: 150,
        data: {
          resourceType: 'taskrun',
          resource: initAutotestTaskRun,
          title: 'prepare',
        },
      },
      {
        id: 'node::promote',
        color: promoteAutotestTaskRunStatusColor,
        height: 35,
        width: 150,
        data: {
          resourceType: 'taskrun',
          resource: promoteTaskRun,
          title: 'promote',
        },
      },
      ...extraNodes,
    ];
  }, [extraNodes, taskRunList]);

  const edges = React.useMemo(() => {
    const initAutotestTaskRun =
      taskRunList &&
      taskRunList.length &&
      taskRunList.find(
        (el) => el.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK] === 'init-autotest'
      );

    const initAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(initAutotestTaskRun);
    const initAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(initAutotestTaskRun);

    const [, initAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
      initAutotestTaskRunStatus,
      initAutotestTaskRunReason
    );

    const promoteTaskRun =
      taskRunList &&
      taskRunList.length &&
      taskRunList.find(
        (el) => el.metadata.labels[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK] === 'promote-images'
      );

    const promoteAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(promoteTaskRun);
    const promoteAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(promoteTaskRun);

    const [, promoteAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
      promoteAutotestTaskRunStatus,
      promoteAutotestTaskRunReason
    );

    const result = [];

    for (const [idx] of _enrichedQualityGatesWithPipelineRuns.entries()) {
      result.push({
        id: `edge::${idx}::prepare`,
        source: 'node::prepare',
        color: initAutotestTaskRunStatusColor,
        target: `node::${idx}`,
      });
      result.push({
        id: `edge::${idx}::promote`,
        source: `node::${idx}`,
        color: promoteAutotestTaskRunStatusColor,
        target: 'node::promote',
      });
    }

    return result;
  }, [_enrichedQualityGatesWithPipelineRuns, taskRunList]);

  return {
    nodes,
    edges,
  };
};
