import { Stack } from '@mui/material';
import React from 'react';
import { MyTileChart } from '../../../../components/TileChart';
import { CHART_STATUS_COLOR } from '../../../../constants/colors';
import { LegendListItem } from '../LegendListItem';
import { useCodebaseBranchesGraphData } from './hooks/useCodebaseBranchesGraphData';

export const CodebaseBranchesGraph = () => {
  const codebaseBranchesInfo = useCodebaseBranchesGraphData();

  return (
    <MyTileChart
      total={codebaseBranchesInfo.total === null ? -1 : codebaseBranchesInfo.total}
      data={[
        {
          name: 'OK',
          value: codebaseBranchesInfo.green,
          fill: CHART_STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: codebaseBranchesInfo.blue,
          fill: CHART_STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: codebaseBranchesInfo.red,
          fill: CHART_STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: codebaseBranchesInfo.grey,
          fill: CHART_STATUS_COLOR.UNKNOWN,
        },
      ]}
      title={`Branches (${codebaseBranchesInfo.total || 0})`}
      // @ts-ignore
      legend={
        <Stack spacing={0.5}>
          {!!codebaseBranchesInfo.green && (
            <LegendListItem
              color={CHART_STATUS_COLOR.SUCCESS}
              number={codebaseBranchesInfo.green}
              label="Ok"
            />
          )}
          {!!codebaseBranchesInfo.red && (
            <LegendListItem
              color={CHART_STATUS_COLOR.ERROR}
              number={codebaseBranchesInfo.red}
              label="Failed"
            />
          )}
          {!!codebaseBranchesInfo.blue && (
            <LegendListItem
              color={CHART_STATUS_COLOR.IN_PROGRESS}
              number={codebaseBranchesInfo.blue}
              label="In Progress"
            />
          )}
          {!!codebaseBranchesInfo.grey && (
            <LegendListItem
              color={CHART_STATUS_COLOR.UNKNOWN}
              number={codebaseBranchesInfo.grey}
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
