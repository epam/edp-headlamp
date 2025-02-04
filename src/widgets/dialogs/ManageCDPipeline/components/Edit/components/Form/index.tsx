import { Stack } from '@mui/material';
import React from 'react';
import { Applications, Description } from '../../../fields';

export const Form = () => {
  return (
    <Stack spacing={5}>
      <Description />
      <Applications />
    </Stack>
  );
};
