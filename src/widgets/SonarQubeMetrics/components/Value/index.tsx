import { Typography } from '@mui/material';
import React from 'react';

export const Value = (props: { value?: string }) => {
  return (
    <Typography component="span" fontSize={16} color="primary.dark" fontWeight={500}>
      {props.value}
    </Typography>
  );
};
