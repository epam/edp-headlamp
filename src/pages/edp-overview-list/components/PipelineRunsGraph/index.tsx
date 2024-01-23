import { Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { STATUS_COLOR } from '../../../../constants/colors';
import { usePipelineRunsGraphData } from './hooks/usePipelineRunsGraphData';

export const PipelineRunsGraph = () => {
  const pipelineRunsInfo = usePipelineRunsGraphData();

  return (
    <HeadlampTileChart
      total={pipelineRunsInfo.total === null ? -1 : pipelineRunsInfo.total}
      data={[
        {
          name: 'Passed',
          value: pipelineRunsInfo.green,
          fill: STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: pipelineRunsInfo.blue,
          fill: STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Suspended',
          value: pipelineRunsInfo.purple,
          fill: STATUS_COLOR.SUSPENDED,
        },
        {
          name: 'Failed',
          value: pipelineRunsInfo.red,
          fill: STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: pipelineRunsInfo.grey,
          fill: STATUS_COLOR.UNKNOWN,
        },
      ]}
      title="PipelineRuns"
      // @ts-ignore
      legend={
        <>
          <Typography component={'div'} variant={'body2'}>
            Total: {pipelineRunsInfo.total}
          </Typography>
          {!!pipelineRunsInfo.green && (
            <Typography component={'div'} variant={'body2'}>
              Passed: {pipelineRunsInfo.green}
            </Typography>
          )}
          {!!pipelineRunsInfo.blue && (
            <Typography component={'div'} variant={'body2'}>
              In Progress: {pipelineRunsInfo.blue}
            </Typography>
          )}
          {!!pipelineRunsInfo.purple && (
            <Typography component={'div'} variant={'body2'}>
              Suspended: {pipelineRunsInfo.purple}
            </Typography>
          )}
          {!!pipelineRunsInfo.red && (
            <Typography component={'div'} variant={'body2'}>
              Failed: {pipelineRunsInfo.red}
            </Typography>
          )}
          {!!pipelineRunsInfo.grey && (
            <Typography component={'div'} variant={'body2'}>
              Unknown: {pipelineRunsInfo.grey}
            </Typography>
          )}
        </>
      }
      label={`${pipelineRunsInfo.green}/${pipelineRunsInfo.total}`}
    />
  );
};
