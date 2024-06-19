import { Stack, Typography } from '@mui/material';
import React from 'react';
import { InfoRow } from '../../../../../components/InfoColumns/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { humanize } from '../../../../../utils/date/humanize';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';

export const useInfoRows = (): InfoRow[] | null => {
  const { pipelineRun } = useDynamicDataContext();

  const status = PipelineRunKubeObject.parseStatus(pipelineRun.data);
  const reason = PipelineRunKubeObject.parseStatusReason(pipelineRun.data);

  const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

  const statusObject = React.useMemo(() => {
    const condition = pipelineRun.data?.status?.conditions?.[0];
    const lastTransitionTime = condition?.lastTransitionTime;
    const completionTime = pipelineRun.data?.status?.completionTime;
    const startedAt = pipelineRun.data?.status?.startTime;
    const message = condition?.message;

    const updatedLast = humanize(new Date(lastTransitionTime).getTime() - new Date().getTime(), {
      language: 'en-mini',
      spacer: '',
      delimiter: ' ',
      fallbacks: ['en'],
      largest: 2,
      round: true,
      units: ['d', 'h', 'm', 's'],
    });

    const activeDuration = humanize(
      completionTime
        ? new Date(completionTime).getTime() - new Date(startedAt).getTime()
        : new Date().getTime() - new Date(startedAt).getTime(),
      {
        language: 'en-mini',
        spacer: '',
        delimiter: ' ',
        fallbacks: ['en'],
        largest: 2,
        round: true,
        units: ['d', 'h', 'm', 's'],
      }
    );

    return {
      startedAt: new Date(pipelineRun.data?.status?.startTime).toLocaleString('en-mini', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      activeDuration,
      updatedLast,
      message: message,
    };
  }, [pipelineRun]);

  return React.useMemo(() => {
    return [
      [
        {
          label: 'Status',
          text: (
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <StatusIcon icon={icon} isRotating={isRotating} color={color} />
              <Typography fontSize={13}>{`${status}, ${reason}`}</Typography>
            </Stack>
          ),
        },
        {
          label: 'Tasks completed',
          text: statusObject.message?.split('Tasks Completed: ')[1],
        },
        {
          label: 'Started at',
          text: statusObject.startedAt,
        },
        {
          label: 'Duration',
          text: statusObject.activeDuration,
        },
        {
          label: 'Last updated',
          text: statusObject.updatedLast,
        },
      ],
    ];
  }, [color, icon, isRotating, reason, status, statusObject]);
};
