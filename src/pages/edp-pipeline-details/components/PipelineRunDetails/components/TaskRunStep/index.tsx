import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { Tabs } from '../../../../../../components/Tabs';
import { PodKubeObject } from '../../../../../../k8s/Pod';
import { getTaskRunStepReason } from '../../../../../../k8s/TaskRun/utils/getStatus';
import { humanize } from '../../../../../../utils/date/humanize';
import { StyledDetailsBody, StyledDetailsHeader } from '../../styles';
import { useTabs } from './hooks/useTabs';

export const TaskRunStep = ({ taskRun, step }) => {
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
    labelSelector: `tekton.dev/taskRun=${taskRun.metadata.name}`,
    namespace: taskRun.metadata.namespace,
  });

  const hasPods = pods?.length > 0;

  const initialTabIdx = hasPods ? 0 : 1;

  const tabs = useTabs({ taskRun, stepName: step?.name, pods });

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
                {reason}
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
