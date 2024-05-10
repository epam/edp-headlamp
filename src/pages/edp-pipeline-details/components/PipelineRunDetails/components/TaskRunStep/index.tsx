import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { Tabs } from '../../../../../../components/Tabs';
import { TaskRunKubeObject } from '../../../../../../k8s/TaskRun';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../../../../../k8s/TaskRun/utils/getStatus';
import { humanize } from '../../../../../../utils/date/humanize';
import { StyledDetailsBody, StyledDetailsHeader } from '../../styles';
import { useTabs } from './hooks/useTabs';

export const TaskRunStep = ({ taskRun, step }) => {
  const status = getTaskRunStepStatus(step);
  const reason = getTaskRunStepReason(step);
  const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(status, reason);

  const completionTime = step?.terminated?.finishedAt || new Date().toISOString();
  const startTime = step?.terminated?.startedAt;

  console.log(completionTime, startTime, step);

  const duration = humanize(new Date(completionTime).getTime() - new Date(startTime).getTime(), {
    language: 'en-mini',
    spacer: '',
    delimiter: ' ',
    fallbacks: ['en'],
    largest: 2,
    round: true,
    units: ['d', 'h', 'm', 's'],
  });

  const tabs = useTabs({ taskRun, stepName: step.name });

  return (
    <Paper>
      <StyledDetailsHeader>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <StatusIcon
                icon={icon}
                color={color}
                isRotating={isRotating}
                Title={`Status: ${status}. Reason: ${reason}`}
                width={25}
              />
              <Typography fontSize={(t) => t.typography.pxToRem(20)} fontWeight={500}>
                {step.name}
              </Typography>
              <Typography variant="caption">{reason}</Typography>
            </Stack>
            <Typography variant="body2">
              {Object.hasOwn(step, 'terminated') ? `Duration: ${duration}` : 'In progress'}
            </Typography>
          </Stack>
        </Stack>
      </StyledDetailsHeader>
      <Divider orientation="horizontal" />
      <StyledDetailsBody>
        <Tabs tabs={tabs} initialTabIdx={0} />
      </StyledDetailsBody>
    </Paper>
  );
};
