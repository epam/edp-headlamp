import { CardNodeColumn, CardNodeTitle } from '@carbon/charts-react/diagrams/CardNode';
import { Button, CircularProgress, Grid, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { Graph } from '../../../../components/Graph';
import { Edge } from '../../../../components/Graph/components/Edge';
import { Node } from '../../../../components/Graph/components/Node';
import { MyNode } from '../../../../components/Graph/components/types';
import { StatusIcon } from '../../../../components/StatusIcon';
import { Table } from '../../../../components/Table';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { SYSTEM_EDP_COMPONENTS } from '../../../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../k8s/PipelineRun/constants';
import { useCreateAutotestRunnerPipelineRun } from '../../../../k8s/PipelineRun/hooks/useCreateAutotestRunnerPipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { TaskRunKubeObject } from '../../../../k8s/TaskRun';
import { TASK_RUN_STEP_REASON, TASK_RUN_STEP_STATUS } from '../../../../k8s/TaskRun/constants';
import { useStreamTaskRunListByPipelineNameAndPipelineType } from '../../../../k8s/TaskRun/hooks/useStreamTaskRunListByPipelineNameAndPipelineType';
import { TaskRunKubeObjectInterface } from '../../../../k8s/TaskRun/types';
import { useStorageSizeQuery } from '../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { LinkCreationService } from '../../../../services/link-creation';
import { ValueOf } from '../../../../types/global';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { useDataContext } from '../../providers/Data/hooks';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from '../../types';
import { useColumns } from './hooks/useColumns';
import { useQualityGatesGraphData } from './hooks/useQualityGatesGraphData';
import { QualityGatesProps } from './types';

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

const getStatusByResourceType = (
  resourceType: 'pipelinerun' | 'taskrun',
  resource: PipelineRunKubeObjectInterface | TaskRunKubeObjectInterface
): [string, string] => {
  if (resourceType === 'taskrun') {
    const status = TaskRunKubeObject.parseStatus(resource);
    const reason = TaskRunKubeObject.parseStatusReason(resource);
    return [status, reason];
  } else if (resourceType === 'pipelinerun') {
    const status = PipelineRunKubeObject.parseStatus(resource);
    const reason = PipelineRunKubeObject.parseStatusReason(resource);
    return [status, reason];
  }

  return [undefined, undefined];
};

const getStatusIconByResourceType = (
  resourceType: 'pipelinerun' | 'taskrun',
  status: string,
  reason: string
): [string, string, boolean] => {
  if (resourceType === 'taskrun') {
    // @ts-ignore
    const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(status, reason);
    return [icon, color, isRotating];
  } else if (resourceType === 'pipelinerun') {
    // @ts-ignore
    const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);
    return [icon, color, isRotating];
  }

  return [undefined, undefined, undefined];
};

const getResourceURLByResourceType = (
  resourceType: 'pipelinerun' | 'taskrun',
  resource: PipelineRunKubeObjectInterface | TaskRunKubeObjectInterface,
  tektonBaseURL
) => {
  if (resourceType === 'taskrun') {
    return (
      resource &&
      LinkCreationService.tekton.createTaskRunLink(
        tektonBaseURL,
        resource?.metadata?.namespace,
        resource?.metadata?.name
      )
    );
  } else if (resourceType === 'pipelinerun') {
    return (
      resource &&
      LinkCreationService.tekton.createPipelineRunLink(
        tektonBaseURL,
        resource?.metadata?.namespace,
        resource?.metadata?.name
      )
    );
  }
};

export const QualityGates = ({
  enrichedQualityGatesWithPipelineRuns,
  argoApplications,
  latestAutotestRunnerPipelineRuns,
  latestTenAutotestPipelineRuns,
  everyArgoAppIsHealthyAndInSync,
}: QualityGatesProps) => {
  const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
  const columns = useColumns();
  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

  const { enrichedApplications } = useDataContext();
  const { stage } = useDynamicDataContext();
  const stageSpecName = stage?.spec.name;

  const { createAutotestRunnerPipelineRun } = useCreateAutotestRunnerPipelineRun({});

  const { data: storageSize } = useStorageSizeQuery(enrichedApplications?.[0]?.application);

  const handleRunAutotestRunner = React.useCallback(async () => {
    if (!storageSize) {
      throw new Error(`Trigger template's storage property has not been found`);
    }

    await createAutotestRunnerPipelineRun({
      namespace,
      storageSize,
      stageSpecName,
      CDPipelineName,
    });
  }, [CDPipelineName, createAutotestRunnerPipelineRun, namespace, stageSpecName, storageSize]);

  const hasAutotests = React.useMemo(
    () => stage?.spec.qualityGates.find(el => el.autotestName),
    [stage?.spec.qualityGates]
  );

  const latestAutotestRunnerPipelineRunName = React.useMemo(
    () => latestAutotestRunnerPipelineRuns?.[0]?.metadata.name,
    [latestAutotestRunnerPipelineRuns]
  );

  const taskRunList = useStreamTaskRunListByPipelineNameAndPipelineType({
    namespace,
    CDPipelineName,
    pipelineType: PIPELINE_TYPES.AUTOTEST_RUNNER,
    parentPipelineRunName: latestAutotestRunnerPipelineRunName,
    select: React.useCallback(data => {
      return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
    }, []),
  });

  const latestAutotestPipelineRunIsRunning = React.useMemo(
    () =>
      PipelineRunKubeObject.parseStatusReason(latestTenAutotestPipelineRuns?.[0]) ===
      PIPELINE_RUN_REASON.RUNNING,
    [latestTenAutotestPipelineRuns]
  );

  const latestAutotestRunnerIsRunning = React.useMemo(
    () =>
      PipelineRunKubeObject.parseStatusReason(latestAutotestRunnerPipelineRuns?.[0]) ===
      PIPELINE_RUN_REASON.RUNNING,
    [latestAutotestRunnerPipelineRuns]
  );

  const thereAreArgoApplications = React.useMemo(
    () => argoApplications.length,
    [argoApplications.length]
  );

  const autotestRunnerPipelineRunActionEnabled = React.useMemo(() => {
    if (
      !thereAreArgoApplications ||
      latestAutotestPipelineRunIsRunning ||
      latestAutotestRunnerIsRunning
    ) {
      return false;
    }

    return everyArgoAppIsHealthyAndInSync;
  }, [
    latestAutotestRunnerIsRunning,
    everyArgoAppIsHealthyAndInSync,
    latestAutotestPipelineRunIsRunning,
    thereAreArgoApplications,
  ]);

  const { nodes, edges } = useQualityGatesGraphData(
    taskRunList,
    enrichedQualityGatesWithPipelineRuns
  );

  const renderSteps = React.useCallback((steps: TaskRunStep[]) => {
    if (!steps) {
      return null;
    }

    return steps.map(step => {
      const stepName = step?.name;
      const status = parseTaskRunStepStatus(step);
      const reason = parseTaskRunStepReason(step);
      const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(status, reason);
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
              <Typography variant={'subtitle2'} title={stepName}>
                {stepName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  }, []);

  const renderNode = React.useCallback(
    (
      node: MyNode<{
        title?: string;
        resourceType?: 'pipelinerun' | 'taskrun';
        resource?: PipelineRunKubeObjectInterface | TaskRunKubeObjectInterface;
      }>
    ) => {
      const {
        data: { resourceType, resource, title },
      } = node;

      const [status, reason] = getStatusByResourceType(resourceType, resource);

      const [icon, color, isRotating] = getStatusIconByResourceType(resourceType, status, reason);
      const steps = resource?.status?.steps;
      const Steps = renderSteps(steps);
      const url = getResourceURLByResourceType(
        resourceType,
        resource,
        EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.TEKTON]
      );
      return (
        // @ts-ignore
        <Node {...node}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CardNodeColumn>
              <StatusIcon
                icon={icon}
                color={color}
                isRotating={isRotating}
                Title={`Status: ${status}. Reason: ${reason}`}
                width={15}
              />
            </CardNodeColumn>
            <CardNodeColumn>
              <ConditionalWrapper
                condition={!!steps}
                wrapper={children => (
                  <Tooltip title={<>{Steps}</>} arrow placement={'bottom'}>
                    {children}
                  </Tooltip>
                )}
              >
                <div>
                  <CardNodeTitle>
                    {url ? (
                      <Link href={url} target={'_blank'}>
                        {title}
                      </Link>
                    ) : (
                      <Typography variant={'subtitle2'}>{title}</Typography>
                    )}
                  </CardNodeTitle>
                </div>
              </ConditionalWrapper>
            </CardNodeColumn>
          </div>
        </Node>
      );
    },
    [EDPComponentsURLS, renderSteps]
  );

  return (
    <Grid container spacing={2} justifyContent={'flex-end'}>
      <Grid item xs={12}>
        <Table
          columns={columns}
          data={enrichedQualityGatesWithPipelineRuns}
          isLoading={!enrichedQualityGatesWithPipelineRuns}
        />
      </Grid>
      <Grid item xs={12}>
        {!!nodes && !!nodes.length && !!edges && !!edges.length ? (
          <Graph
            direction={'RIGHT'}
            nodes={nodes}
            edges={edges}
            id={'quality-gates'}
            renderEdge={edge => <Edge direction={'RIGHT'} {...edge} />}
            renderNode={renderNode}
          />
        ) : (
          <CircularProgress />
        )}
        <Grid container justifyContent={'flex-end'}>
          <Grid item>
            <Button
              component={'button'}
              type={'button'}
              variant={'contained'}
              color={'primary'}
              size={'small'}
              disabled={!autotestRunnerPipelineRunActionEnabled || !hasAutotests}
              onClick={handleRunAutotestRunner}
            >
              {latestAutotestRunnerIsRunning ? (
                <CircularProgress
                  style={{
                    width: rem(18),
                    height: rem(18),
                    marginRight: rem(5),
                  }}
                />
              ) : null}
              Promote
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
