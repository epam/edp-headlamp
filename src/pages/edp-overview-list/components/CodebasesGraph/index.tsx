import { Stack } from '@mui/material';
import React from 'react';
import { MyTileChart } from '../../../../components/TileChart';
import { CHART_STATUS_COLOR } from '../../../../constants/colors';
import { LegendListItem } from '../LegendListItem';
import { useCodebasesGraphData } from './hooks/useCodebasesGraphData';

export const CodebasesGraph = () => {
  const codebasesInfo = useCodebasesGraphData();

  return (
    <MyTileChart
      total={codebasesInfo.total === null ? -1 : codebasesInfo.total}
      data={[
        {
          name: 'OK',
          value: codebasesInfo.green,
          fill: CHART_STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: codebasesInfo.blue,
          fill: CHART_STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: codebasesInfo.red,
          fill: CHART_STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: codebasesInfo.grey,
          fill: CHART_STATUS_COLOR.UNKNOWN,
        },
      ]}
      title={`Codebases (${codebasesInfo.total || 0})`}
      // @ts-ignore
      legend={
        <Stack spacing={0.5}>
          {!!codebasesInfo.green && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUCCESS}
              number={codebasesInfo.green}
              label="Ok"
            />
          )}
          {!!codebasesInfo.red && (
            <LegendListItem
              color={CHART_STATUS_COLOR.ERROR}
              number={codebasesInfo.red}
              label="Failed"
            />
          )}
          {!!codebasesInfo.blue && (
            <LegendListItem
              color={CHART_STATUS_COLOR.IN_PROGRESS}
              number={codebasesInfo.blue}
              label="In Progress"
            />
          )}
          {!!codebasesInfo.grey && (
            <LegendListItem
              color={CHART_STATUS_COLOR.UNKNOWN}
              number={codebasesInfo.grey}
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
