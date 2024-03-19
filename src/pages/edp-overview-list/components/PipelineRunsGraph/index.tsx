import { Stack, Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { MyTileChart } from '../../../../components/TileChart';
import { CHART_STATUS_COLOR, STATUS_COLOR } from '../../../../constants/colors';
import { LegendListItem } from '../LegendListItem';
import { usePipelineRunsGraphData } from './hooks/usePipelineRunsGraphData';

export const PipelineRunsGraph = () => {
  const pipelineRunsInfo = usePipelineRunsGraphData();

  return (
    <MyTileChart
      total={pipelineRunsInfo.total === null ? -1 : pipelineRunsInfo.total}
      data={[
        {
          name: 'OK',
          value: pipelineRunsInfo.green,
          fill: CHART_STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: pipelineRunsInfo.blue,
          fill: CHART_STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: pipelineRunsInfo.red,
          fill: CHART_STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: pipelineRunsInfo.grey,
          fill: CHART_STATUS_COLOR.UNKNOWN,
        },
      ]}
      title={`Pipelines (${pipelineRunsInfo.total || 0})`}
      // @ts-ignore
      legend={
        <Stack spacing={0.5}>
          {!!pipelineRunsInfo.green && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUCCESS}
              number={pipelineRunsInfo.green}
              label="Passed"
            />
          )}
          {!!pipelineRunsInfo.red && (
            <LegendListItem
              color={CHART_STATUS_COLOR.ERROR}
              number={pipelineRunsInfo.red}
              label="Failed"
            />
          )}
          {!!pipelineRunsInfo.purple && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUSPENDED}
              number={pipelineRunsInfo.purple}
              label="Suspended"
            />
          )}
          {!!pipelineRunsInfo.blue && (
            <LegendListItem
              color={CHART_STATUS_COLOR.IN_PROGRESS}
              number={pipelineRunsInfo.blue}
              label="In Progress"
            />
          )}
          {!!pipelineRunsInfo.grey && (
            <LegendListItem
              color={CHART_STATUS_COLOR.UNKNOWN}
              number={pipelineRunsInfo.grey}
              label="Unknown"
            />
          )}
        </Stack>
      }
      size={190}
      thickness={30}
      BoxSx={{ width: '129px', height: '129px' }}
    />
  );

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
