import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ProjectName } from './fields';

export const CodemieProjectForm = () => {
  return (
    <>
      <Typography variant="h6">Project</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProjectName />
        </Grid>
      </Grid>
    </>
  );
};
