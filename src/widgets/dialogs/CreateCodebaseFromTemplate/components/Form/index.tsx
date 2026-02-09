import { Grid } from '@mui/material';
import React from 'react';
import {
  CiTool,
  CodebaseVersioning,
  Description,
  GitServer,
  GitUrlPath,
  Name,
  Private,
} from '../fields';
import { useUpdateVersioningFields } from './hooks/useUpdateVersioningFields';

export const Form = () => {
  useUpdateVersioningFields();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Name />
      </Grid>
      <Grid item xs={8}>
        <Description />
      </Grid>
      <Grid item xs={12}>
        <GitServer />
      </Grid>
      <Grid item xs={12}>
        <GitUrlPath />
      </Grid>
      <Grid item xs={12}>
        <CiTool />
      </Grid>
      <Grid item xs={12}>
        <Private />
      </Grid>
      <Grid item xs={12}>
        <CodebaseVersioning />
      </Grid>
    </Grid>
  );
};
