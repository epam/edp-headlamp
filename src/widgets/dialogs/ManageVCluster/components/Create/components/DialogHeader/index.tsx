import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

export const DialogHeader = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          Create Virtual Cluster
        </Typography>
      </Stack>
    </Stack>
  );
};
