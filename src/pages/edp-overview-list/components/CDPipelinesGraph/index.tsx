import { Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { STATUS_COLOR } from '../../../../constants/colors';
import { useCDPipelinesGraphData } from './hooks/useCDPipelinesGraphData';

export const CDPipelinesGraph = () => {
  const CDPipelinesInfo = useCDPipelinesGraphData();

  return (
    <HeadlampTileChart
      total={CDPipelinesInfo.total === null ? -1 : CDPipelinesInfo.total}
      data={[
        {
          name: 'OK',
          value: CDPipelinesInfo.green,
          fill: STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: CDPipelinesInfo.blue,
          fill: STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: CDPipelinesInfo.red,
          fill: STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: CDPipelinesInfo.grey,
          fill: STATUS_COLOR.UNKNOWN,
        },
      ]}
      title="CDPipelines"
      // @ts-ignore
      legend={
        <>
          <Typography component={'div'} variant={'body2'}>
            Total: {CDPipelinesInfo.total}
          </Typography>
          {!!CDPipelinesInfo.green && (
            <Typography component={'div'} variant={'body2'}>
              OK: {CDPipelinesInfo.green}
            </Typography>
          )}
          {!!CDPipelinesInfo.blue && (
            <Typography component={'div'} variant={'body2'}>
              In Progress: {CDPipelinesInfo.blue}
            </Typography>
          )}
          {!!CDPipelinesInfo.red && (
            <Typography component={'div'} variant={'body2'}>
              Failed: {CDPipelinesInfo.red}
            </Typography>
          )}
          {!!CDPipelinesInfo.grey && (
            <Typography component={'div'} variant={'body2'}>
              Unknown: {CDPipelinesInfo.grey}
            </Typography>
          )}
        </>
      }
      label={`${CDPipelinesInfo.green}/${CDPipelinesInfo.total}`}
    />
  );
};
