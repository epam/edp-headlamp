import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { Tabs } from '../../../../../../components/Tabs';
import { TaskRunKubeObject } from '../../../../../../k8s/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/TaskRun/types';
import { humanize } from '../../../../../../utils/date/humanize';
import { StyledDetailsBody, StyledDetailsHeader } from '../../styles';
import { useTabs } from './hooks/useTabs';

export const TaskRun = ({ taskRun }: { taskRun: TaskRunKubeObjectInterface }) => {
  const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
  const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

  const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(taskRunStatus, taskRunReason);

  const completionTime = taskRun?.status?.completionTime;
  const startTime = taskRun?.status?.startTime;

  const duration = humanize(new Date(completionTime).getTime() - new Date(startTime).getTime(), {
    language: 'en-mini',
    spacer: '',
    delimiter: ' ',
    fallbacks: ['en'],
    largest: 2,
    round: true,
    units: ['d', 'h', 'm', 's'],
  });

  const tabs = useTabs({ taskRun });

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
                Title={`Status: ${taskRunStatus}. Reason: ${taskRunReason}`}
                width={25}
              />
              <Typography fontSize={(t) => t.typography.pxToRem(20)} fontWeight={500}>
                {taskRun.metadata.labels['tekton.dev/pipelineTask']}
              </Typography>
              <Typography variant="caption">{taskRunReason}</Typography>
            </Stack>
            <Typography variant="body2">Duration: {duration}</Typography>
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
