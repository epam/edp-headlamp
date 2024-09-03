import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { Tabs } from '../../../../../../components/Tabs';
import { PodKubeObject } from '../../../../../../k8s/groups/default/Pod';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/TaskRun/types';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../../../../../k8s/groups/Tekton/TaskRun/utils/getStatus';
import { humanize } from '../../../../../../utils/date/humanize';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { StyledDetailsBody, StyledDetailsHeader } from '../../styles';
import { useTabs } from './hooks/useTabs';
import { TaskRunStepProps } from './types';

export const TaskRunStep = ({ pipelineRunTaskData, stepName }: TaskRunStepProps) => {
  const step = pipelineRunTaskData.taskRun
    ? pipelineRunTaskData.taskRun?.status?.steps?.find(
        (step: TaskRunKubeObjectInterface) => step?.name === stepName
      )
    : pipelineRunTaskData.task?.step?.steps?.find(
        (step: TaskRunKubeObjectInterface) => step?.name === stepName
      );

  const status = getTaskRunStepStatus(step);
  const reason = getTaskRunStepReason(step);

  const completionTime = step?.terminated?.finishedAt || new Date().toISOString();
  const startTime = step?.terminated?.startedAt;

  const duration = humanize(new Date(completionTime).getTime() - new Date(startTime).getTime(), {
    language: 'en-mini',
    spacer: '',
    delimiter: ' ',
    fallbacks: ['en'],
    largest: 2,
    round: true,
    units: ['d', 'h', 'm', 's'],
  });

  const [pods] = PodKubeObject.useList({
    labelSelector: `tekton.dev/taskRun=${pipelineRunTaskData.taskRun?.metadata.name}`,
    namespace: pipelineRunTaskData.taskRun?.metadata.namespace,
  });

  const hasPods = pods?.length > 0;

  const initialTabIdx = hasPods ? 0 : 1;

  const tabs = useTabs({
    taskRun: pipelineRunTaskData.taskRun,
    stepName: step?.name,
    pods,
    task: pipelineRunTaskData.task,
  });

  return (
    <Paper>
      <StyledDetailsHeader>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontSize={(t) => t.typography.pxToRem(20)} fontWeight={500}>
              {step?.name}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              fontSize={(t) => t.typography.pxToRem(14)}
              fontWeight={500}
              color="primary.dark"
            >
              Status:{' '}
              <Typography
                fontSize={(t) => t.typography.pxToRem(14)}
                component="span"
                color="secondary.dark"
              >
                {capitalizeFirstLetter(reason || status || 'unknown')}
              </Typography>
            </Typography>
            <Typography
              fontSize={(t) => t.typography.pxToRem(14)}
              fontWeight={500}
              color="primary.dark"
            >
              Duration:{' '}
              <Typography
                fontSize={(t) => t.typography.pxToRem(14)}
                component="span"
                color="secondary.dark"
              >
                {step && Object.hasOwn(step, 'terminated') ? duration : 'In progress'}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </StyledDetailsHeader>
      <Divider orientation="horizontal" />
      <StyledDetailsBody>
        <LoadingWrapper isLoading={pods === null}>
          <Tabs tabs={tabs} initialTabIdx={initialTabIdx} />
        </LoadingWrapper>
      </StyledDetailsBody>
    </Paper>
  );
};
