import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

export const LoadingWrapper: React.FC<{ isLoading: boolean }> = ({ children, isLoading }) => {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid item xs={12}>
                    {children}
                </Grid>
            )}
        </Grid>
    );
};
