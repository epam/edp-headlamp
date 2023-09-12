import { Grid } from '@material-ui/core';
import React from 'react';
import { CodebaseVersioning, Description, GitServer, GitUrlPath, Name } from '../fields';
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
                <Grid container spacing={2} alignItems={'flex-start'}>
                    <Grid item xs={4}>
                        <GitServer />
                    </Grid>
                    <Grid item xs={8}>
                        <GitUrlPath />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CodebaseVersioning />
            </Grid>
        </Grid>
    );
};
