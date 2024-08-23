import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const LoadingWrapper: React.FC<{ isLoading: boolean; size?: number }> = ({
  children,
  isLoading,
  size = 40,
}) => {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      {isLoading ? (
        <CircularProgress size={size} />
      ) : (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
    </Grid>
  );
};
