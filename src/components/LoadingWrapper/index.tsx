import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const LoadingWrapper: React.FC<{ isLoading: boolean; size?: number }> = ({
  children,
  isLoading,
  size = 40,
}) => {
  return isLoading ? (
    <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '100%' }}>
      <CircularProgress size={size} />
    </Grid>
  ) : (
    <>{children}</>
  );
};
