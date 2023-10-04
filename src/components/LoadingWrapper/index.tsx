import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { Render } from '../Render';

export const LoadingWrapper: React.FC<{ isLoading: boolean }> = ({ children, isLoading }) => {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'}>
            <Render condition={isLoading}>
                <CircularProgress />
            </Render>
            <Render condition={!isLoading}>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Render>
        </Grid>
    );
};
