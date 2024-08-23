import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';

export const DialogHeader = () => {
  const {
    props: { codebaseBranch },
  } = useCurrentDialog();

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography
          fontSize={theme.typography.pxToRem(20)}
          fontWeight={500}
        >{`Edit ${codebaseBranch?.spec.branchName}`}</Typography>
      </Stack>
    </Stack>
  );
};
