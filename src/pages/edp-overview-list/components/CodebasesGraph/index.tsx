import { Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { STATUS_COLOR } from '../../../../constants/colors';
import { useCodebasesGraphData } from './hooks/useCodebasesGraphData';

export const CodebasesGraph = () => {
  const codebasesInfo = useCodebasesGraphData();

  return (
    <HeadlampTileChart
      total={codebasesInfo.total === null ? -1 : codebasesInfo.total}
      data={[
        {
          name: 'OK',
          value: codebasesInfo.green,
          fill: STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: codebasesInfo.blue,
          fill: STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: codebasesInfo.red,
          fill: STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: codebasesInfo.grey,
          fill: STATUS_COLOR.UNKNOWN,
        },
      ]}
      title="Codebases"
      // @ts-ignore
      legend={
        <>
          <Typography component={'div'} variant={'body2'}>
            Total: {codebasesInfo.total}
          </Typography>
          {!!codebasesInfo.green && (
            <Typography component={'div'} variant={'body2'}>
              OK: {codebasesInfo.green}
            </Typography>
          )}
          {!!codebasesInfo.blue && (
            <Typography component={'div'} variant={'body2'}>
              In Progress: {codebasesInfo.blue}
            </Typography>
          )}
          {!!codebasesInfo.red && (
            <Typography component={'div'} variant={'body2'}>
              Failed: {codebasesInfo.red}
            </Typography>
          )}
          {!!codebasesInfo.grey && (
            <Typography component={'div'} variant={'body2'}>
              Unknown: {codebasesInfo.grey}
            </Typography>
          )}
        </>
      }
      label={`${codebasesInfo.green}/${codebasesInfo.total}`}
    />
  );
};
