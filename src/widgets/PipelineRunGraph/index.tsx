import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { StatusIcon } from '../../components/StatusIcon';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { TaskRunKubeObject } from '../../k8s/groups/Tekton/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../k8s/groups/Tekton/TaskRun/labels';
import { TaskRunKubeObjectInterface, TaskRunStep } from '../../k8s/groups/Tekton/TaskRun/types';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../k8s/groups/Tekton/TaskRun/utils/getStatus';
import { routePipelineRunDetails } from '../../pages/pipeline-details/route';
import { rem } from '../../utils/styling/rem';
import { usePipelineRunGraphData } from './hooks/usePipelineRunGraphData';
import { useStyles } from './styles';
import { PipelineRunGraphProps } from './types';

export const PipelineRunGraph = ({ pipelineRun }: PipelineRunGraphProps) => {
  const classes = useStyles();

  const namespace = pipelineRun?.metadata.namespace;

  const [taskRuns] = TaskRunKubeObject.useList({
    labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${pipelineRun.metadata.name}`,
  });

  const { nodes, edges } = usePipelineRunGraphData(taskRuns, pipelineRun);

  const diagramIsReady = nodes !== null && edges !== null;

  const renderTaskLegend = React.useCallback(
    (steps: TaskRunStep[], taskRun: TaskRunKubeObjectInterface, taskRunName: string) => {
      const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
      const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

      const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(
        taskRunStatus,
        taskRunReason
      );

      return (
        <div style={{ padding: `${rem(10)} 0` }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <StatusIcon
                    icon={icon}
                    color={color}
                    isRotating={isRotating}
                    Title={`Status: ${taskRunStatus}. Reason: ${taskRunReason}`}
                    width={15}
                  />
                </Grid>
                <Grid item>
                  <Link
                    routeName={routePipelineRunDetails.path}
                    params={{
                      namespace,
                      name: pipelineRun.metadata.name,
                    }}
                    search={`?taskRun=${name}`}
                  >
                    <Typography variant={'subtitle2'} className={classes.treeItemTitle}>
                      {taskRunName}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            {!!steps && !!steps.length ? (
              <>
                <Grid item xs={12}>
                  <Typography variant={'subtitle1'}>Steps:</Typography>
                </Grid>
                <Grid item xs={12}>
                  {steps.map((step) => {
                    const stepName = step?.name;
                    const status = getTaskRunStepStatus(step);
                    const reason = getTaskRunStepReason(step);
                    const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(
                      status,
                      reason
                    );

                    return (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems={'center'}>
                          <Grid item>
                            <StatusIcon
                              icon={icon}
                              color={color}
                              isRotating={isRotating}
                              Title={`Status: ${status}. Reason: ${reason}`}
                              width={15}
                            />
                          </Grid>
                          <Grid item>
                            <Link
                              routeName={routePipelineRunDetails.path}
                              params={{
                                namespace,
                                name: pipelineRun.metadata.name,
                              }}
                              search={`?taskRun=${taskRunName}&step=${stepName}`}
                            >
                              <Typography variant={'subtitle2'} title={stepName}>
                                {stepName}
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : null}
          </Grid>
        </div>
      );
    },
    [classes.treeItemTitle, namespace, pipelineRun.metadata.name]
  );

  const renderNode = React.useCallback(
    (node: MyNode<{ name: string; TaskRunByName: TaskRunKubeObjectInterface }>) => {
      const {
        data: { name, TaskRunByName },
      } = node;

      const steps = TaskRunByName?.status?.steps;

      const status = TaskRunKubeObject.parseStatus(TaskRunByName);
      const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
      const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

      return (
        // @ts-ignore
        <Node {...node}>
          <Tooltip
            title={<>{renderTaskLegend(steps, TaskRunByName, name)}</>}
            arrow
            placement={'bottom'}
          >
            <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
              <Grid item>
                <StatusIcon
                  icon={icon}
                  color={color}
                  isRotating={isRotating}
                  Title={null}
                  width={15}
                />
              </Grid>
              <Grid item style={{ overflow: 'hidden' }}>
                <Link
                  routeName={routePipelineRunDetails.path}
                  params={{
                    namespace,
                    name: pipelineRun.metadata.name,
                  }}
                  search={`?taskRun=${name}`}
                >
                  <Typography variant={'subtitle2'} className={classes.treeItemTitle}>
                    {name}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Tooltip>
        </Node>
      );
    },
    [classes.treeItemTitle, namespace, pipelineRun.metadata.name, renderTaskLegend]
  );

  return (
    <LoadingWrapper isLoading={taskRuns === null && !diagramIsReady}>
      {diagramIsReady && (
        <div>
          <Graph
            direction={'RIGHT'}
            nodes={nodes}
            edges={edges}
            id={'pipeline-run-steps'}
            renderEdge={(edge) => <Edge direction={'RIGHT'} {...edge} />}
            renderNode={renderNode}
          />
        </div>
      )}
      {taskRuns !== null && !taskRuns?.length ? (
        <Typography variant={'body1'} align={'center'}>
          Couldn't find TaskRuns for the PipelineRun
        </Typography>
      ) : null}
    </LoadingWrapper>
  );
};
