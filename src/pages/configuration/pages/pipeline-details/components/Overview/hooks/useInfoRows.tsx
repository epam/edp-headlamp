import { Chip, Grid } from '@mui/material';
import React from 'react';
import { InfoRow } from '../../../../../../../components/InfoColumns/types';
import { PipelineKubeObjectInterface } from '../../../../../../../k8s/groups/Tekton/Pipeline/types';

export const useInfoRows = (pipeline: PipelineKubeObjectInterface): InfoRow[] | null => {
  return React.useMemo(() => {
    if (!pipeline) {
      return null;
    }

    const pipelineLabels = Object.entries(pipeline.metadata.labels).map(
      ([key, value]) => `${key}:${value}`
    );

    return [
      [
        {
          label: 'Created At',
          text: new Date(pipeline.metadata.creationTimestamp).toLocaleString('en-mini', {
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
  }, [pipeline]);
};
