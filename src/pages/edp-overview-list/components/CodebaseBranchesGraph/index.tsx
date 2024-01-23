import { Typography } from '@mui/material';
import React from 'react';
import { HeadlampTileChart } from '../../../../components/HeadlampTileChart';
import { STATUS_COLOR } from '../../../../constants/colors';
import { useCodebaseBranchesGraphData } from './hooks/useCodebaseBranchesGraphData';

export const CodebaseBranchesGraph = () => {
  const codebaseBranchesInfo = useCodebaseBranchesGraphData();

  return (
    <HeadlampTileChart
      total={codebaseBranchesInfo.total === null ? -1 : codebaseBranchesInfo.total}
      data={[
        {
          name: 'OK',
          value: codebaseBranchesInfo.green,
          fill: STATUS_COLOR.SUCCESS,
        },
        {
          name: 'In Progress',
          value: codebaseBranchesInfo.blue,
          fill: STATUS_COLOR.IN_PROGRESS,
        },
        {
          name: 'Failed',
          value: codebaseBranchesInfo.red,
          fill: STATUS_COLOR.ERROR,
        },
        {
          name: 'Unknown',
          value: codebaseBranchesInfo.grey,
          fill: STATUS_COLOR.UNKNOWN,
        },
      ]}
      title="Branches"
      // @ts-ignore
      legend={
        <>
          <Typography component={'div'} variant={'body2'}>
            Total: {codebaseBranchesInfo.total}
          </Typography>
          {!!codebaseBranchesInfo.green && (
            <Typography component={'div'} variant={'body2'}>
              OK: {codebaseBranchesInfo.green}
            </Typography>
          )}
          {!!codebaseBranchesInfo.blue && (
            <Typography component={'div'} variant={'body2'}>
              In Progress: {codebaseBranchesInfo.blue}
            </Typography>
          )}
          {!!codebaseBranchesInfo.red && (
            <Typography component={'div'} variant={'body2'}>
              Failed: {codebaseBranchesInfo.red}
            </Typography>
          )}
          {!!codebaseBranchesInfo.grey && (
            <Typography component={'div'} variant={'body2'}>
              Unknown: {codebaseBranchesInfo.grey}
            </Typography>
          )}
        </>
      }
      label={`${codebaseBranchesInfo.green}/${codebaseBranchesInfo.total}`}
    />
  );
};
