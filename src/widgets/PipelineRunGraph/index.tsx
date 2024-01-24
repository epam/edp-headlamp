import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SYSTEM_EDP_COMPONENTS } from '../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../k8s/TaskRun';
import { TASK_RUN_STEP_REASON, TASK_RUN_STEP_STATUS } from '../../k8s/TaskRun/constants';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../k8s/TaskRun/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { LinkCreationService } from '../../services/link-creation';
import { ValueOf } from '../../types/global';
import { rem } from '../../utils/styling/rem';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from './constants';
import { useInfoRows } from './hooks/useInfoRows';
import { usePipelineRunGraphData } from './hooks/usePipelineRunGraphData';
import { useStyles } from './styles';
import { PipelineRunGraphDialogForwardedProps } from './types';

interface TaskRunStep {
  // @ts-ignore
  name: string;
  [key: string]: {
    reason?: ValueOf<typeof TASK_RUN_STEP_REASON>;
  };
}

const parseTaskRunStepStatus = (step: TaskRunStep) => {
  return step?.[TASK_RUN_STEP_STATUS.RUNNING]
    ? TASK_RUN_STEP_STATUS.RUNNING
    : step?.[TASK_RUN_STEP_STATUS.WAITING]
    ? TASK_RUN_STEP_STATUS.WAITING
    : step?.[TASK_RUN_STEP_STATUS.TERMINATED]
    ? TASK_RUN_STEP_STATUS.TERMINATED
    : undefined;
};

const parseTaskRunStepStatusObject = (step: TaskRunStep) => {
  return (
    step?.[TASK_RUN_STEP_STATUS.RUNNING] ||
    step?.[TASK_RUN_STEP_STATUS.WAITING] ||
    step?.[TASK_RUN_STEP_STATUS.TERMINATED]
  );
};

const parseTaskRunStepReason = (step: TaskRunStep): ValueOf<typeof TASK_RUN_STEP_REASON> => {
  const statusObject = parseTaskRunStepStatusObject(step);
  return statusObject?.reason;
};

export const PipelineRunGraph = () => {
  const classes = useStyles();

  const {
    open,
    forwardedProps: { pipelineRun },
    closeDialog,
  } = useSpecificDialogContext<PipelineRunGraphDialogForwardedProps>(
    PIPELINE_RUN_GRAPH_DIALOG_NAME
  );

  const namespace = pipelineRun?.metadata.namespace;

  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
  const tektonBaseURL = EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.TEKTON];

  const [taskRuns] = TaskRunKubeObject.useList({
    labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${pipelineRun.metadata.name}`,
  });

  const pipelineRunTasks = pipelineRun?.status?.pipelineSpec?.tasks;

  const { nodes, edges } = usePipelineRunGraphData(taskRuns, pipelineRunTasks);

  const diagramIsReady = nodes !== null && edges !== null;

  const renderTaskLegend = React.useCallback(
    (steps: TaskRunStep[], taskRun: TaskRunKubeObjectInterface, taskRunName: string) => {
      const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
      const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

      const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(
        taskRunStatus,
        taskRunReason
      );

      const taskRunAnchorLink = LinkCreationService.tekton.createPipelineRunLink(
        tektonBaseURL,
        namespace,
        pipelineRun.metadata.name,
        taskRunName
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
                  <Link href={taskRunAnchorLink} target={'_blank'}>
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
                    const status = parseTaskRunStepStatus(step);
                    const reason = parseTaskRunStepReason(step);
                    const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(
                      status,
                      reason
                    );

                    const taskRunStepLink = LinkCreationService.tekton.createPipelineRunLink(
                      tektonBaseURL,
                      namespace,
                      pipelineRun.metadata.name,
                      taskRunName,
                      stepName
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
                            <Link href={taskRunStepLink} target={'_blank'}>
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
    [classes.treeItemTitle, namespace, pipelineRun.metadata.name, tektonBaseURL]
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

      const taskRunAnchorLink = LinkCreationService.tekton.createPipelineRunLink(
        tektonBaseURL,
        namespace,
        pipelineRun.metadata.name,
        name
      );

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
                <Link href={taskRunAnchorLink} target={'_blank'}>
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
    [classes.treeItemTitle, namespace, pipelineRun.metadata.name, renderTaskLegend, tektonBaseURL]
  );

  const infoRows = useInfoRows(tektonBaseURL);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => closeDialog()}
      maxWidth={'xl'}
      className={classes.dialog}
    >
      <DialogTitle>
        <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <Typography variant={'h4'}>Tree Diagram</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => closeDialog()} size="large">
              <Icon icon={ICONS.CROSS} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InfoColumnsAccordion infoRows={infoRows} title={'Details'} />
          </Grid>
          <Grid item xs={12} style={{ minHeight: rem(300) }}>
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
              {(!pipelineRunTasks || !pipelineRunTasks?.length) && (
                <Typography variant={'body1'} align={'center'}>
                  The PipelineRun has no tasks
                </Typography>
              )}
              {!taskRuns?.length ? (
                <Typography variant={'body1'} align={'center'}>
                  Couldn't find TaskRuns for the PipelineRun
                </Typography>
              ) : null}
            </LoadingWrapper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
