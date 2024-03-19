import { Stack } from '@mui/material';
import React from 'react';
import { MyTileChart } from '../../../../components/TileChart';
import { CHART_STATUS_COLOR } from '../../../../constants/colors';
import { LegendListItem } from '../LegendListItem';
import { useStagesGraphData } from './hooks/useStagesGraphData';

export const StagesGraph = () => {
  const StagesInfo = useStagesGraphData();

  return (
    <MyTileChart
      total={StagesInfo.total === null ? -1 : StagesInfo.total}
      data={[
        {
          name: 'OK',
          value: StagesInfo.green,
          fill: CHART_STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: StagesInfo.blue,
          fill: CHART_STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: StagesInfo.red,
          fill: CHART_STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: StagesInfo.grey,
          fill: CHART_STATUS_COLOR.UNKNOWN,
        },
      ]}
      title={`Stages (${StagesInfo.total || 0})`}
      // @ts-ignore
      legend={
        <Stack spacing={0.5}>
          {!!StagesInfo.green && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUCCESS}
              number={StagesInfo.green}
              label="Ok"
            />
          )}
          {!!StagesInfo.red && (
            <LegendListItem
              color={CHART_STATUS_COLOR.ERROR}
              number={StagesInfo.red}
              label="Failed"
            />
          )}
          {!!StagesInfo.blue && (
            <LegendListItem
              color={CHART_STATUS_COLOR.IN_PROGRESS}
              number={StagesInfo.blue}
              label="In Progress"
            />
          )}
          {!!StagesInfo.grey && (
            <LegendListItem
              color={CHART_STATUS_COLOR.UNKNOWN}
              number={StagesInfo.grey}
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
};
