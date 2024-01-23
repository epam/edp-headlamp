import { Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

export const Value = (props: { value?: string }) => {
  const classes = useStyles();

  return (
    <Typography component="span" className={classes.value}>
      {props.value}
    </Typography>
  );
};
