import { Chip, Grid } from '@mui/material';
import React from 'react';
import { InfoRow } from '../../../../../../../components/InfoColumns/types';
import { TaskKubeObjectInterface } from '../../../../../../../k8s/groups/Tekton/Task/types';

export const useInfoRows = (task: TaskKubeObjectInterface): InfoRow[] => {
  return React.useMemo(() => {
    const pipelineLabels = Object.entries(task.metadata?.labels || {}).map(
      ([key, value]) => `${key}:${value}`
    );

    return [
      [
        {
          label: 'Created At',
          text: new Date(task.metadata.creationTimestamp).toLocaleString('en-mini', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
        },
        {
          label: 'Labels',
          text: (
            <Grid container spacing={1} flexWrap="wrap">
              {pipelineLabels.map((el) => (
                <Grid item key={el}>
                  <Chip label={el} size="small" />
                </Grid>
              ))}
            </Grid>
          ),
          columnXs: 10,
        },
      ],
    ];
  }, [task]);
};
