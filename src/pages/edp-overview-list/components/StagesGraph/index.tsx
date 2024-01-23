import { Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { STATUS_COLOR } from '../../../../constants/colors';
import { useStagesGraphData } from './hooks/useStagesGraphData';

export const StagesGraph = () => {
  const StagesInfo = useStagesGraphData();

  return (
    <HeadlampTileChart
      total={StagesInfo.total === null ? -1 : StagesInfo.total}
      data={[
        {
          name: 'OK',
          value: StagesInfo.green,
          fill: STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: StagesInfo.blue,
          fill: STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: StagesInfo.red,
          fill: STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: StagesInfo.grey,
          fill: STATUS_COLOR.UNKNOWN,
        },
      ]}
      title="Stages"
      // @ts-ignore
      legend={
        <>
          <Typography component={'div'} variant={'body2'}>
            Total: {StagesInfo.total}
          </Typography>
          {!!StagesInfo.green && (
            <Typography component={'div'} variant={'body2'}>
              OK: {StagesInfo.green}
            </Typography>
          )}
          {!!StagesInfo.blue && (
            <Typography component={'div'} variant={'body2'}>
              In Progress: {StagesInfo.blue}
            </Typography>
          )}
          {!!StagesInfo.red && (
            <Typography component={'div'} variant={'body2'}>
              Failed: {StagesInfo.red}
            </Typography>
          )}
          {!!StagesInfo.grey && (
            <Typography component={'div'} variant={'body2'}>
              Unknown: {StagesInfo.grey}
            </Typography>
          )}
        </>
      }
      label={`${StagesInfo.green}/${StagesInfo.total}`}
    />
  );
};
