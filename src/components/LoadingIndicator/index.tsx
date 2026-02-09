import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const LoadingIndicator: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '100%' }}>
      <CircularProgress size={size} />
    </Grid>
  );
};
