import { Stack } from '@mui/material';
import React from 'react';
import { MyTileChart } from '../../../../components/TileChart';
import { CHART_STATUS_COLOR } from '../../../../constants/colors';
import { LegendListItem } from '../LegendListItem';
import { useCDPipelinesGraphData } from './hooks/useCDPipelinesGraphData';

export const CDPipelinesGraph = () => {
  const CDPipelinesInfo = useCDPipelinesGraphData();

  return (
    <MyTileChart
      total={CDPipelinesInfo.total === null ? -1 : CDPipelinesInfo.total}
      data={[
        {
          name: 'OK',
          value: CDPipelinesInfo.green,
          fill: CHART_STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: CDPipelinesInfo.blue,
          fill: CHART_STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: CDPipelinesInfo.red,
          fill: CHART_STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: CDPipelinesInfo.grey,
          fill: CHART_STATUS_COLOR.UNKNOWN,
        },
      ]}
      title={`Environments (${CDPipelinesInfo.total || 0})`}
      // @ts-ignore
      legend={
        <Stack spacing={0.5}>
          {!!CDPipelinesInfo.green && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUCCESS}
              number={CDPipelinesInfo.green}
              label="Ok"
            />
          )}
          {!!CDPipelinesInfo.red && (
            <LegendListItem
              color={CHART_STATUS_COLOR.ERROR}
              number={CDPipelinesInfo.red}
              label="Failed"
            />
          )}
          {!!CDPipelinesInfo.blue && (
            <LegendListItem
              color={CHART_STATUS_COLOR.IN_PROGRESS}
              number={CDPipelinesInfo.blue}
              label="In Progress"
            />
          )}
          {!!CDPipelinesInfo.grey && (
            <LegendListItem
              color={CHART_STATUS_COLOR.UNKNOWN}
              number={CDPipelinesInfo.grey}
              label="Unknown"
            />
          )}
        </Stack>
      }
      size={190}
      thickness={30}
      BoxSx={{ width: '152px', height: '152px' }}
    />
  );
};
