import { Grid } from '@material-ui/core';
import React from 'react';
import { CodebaseVersioning } from './components/CodebaseVersioning';
import { Description } from './components/Description';
import { GitServer } from './components/GitServer';
import { GitUrlPath } from './components/GitUrlPath';
import { Name } from './components/Name';
import { useUpdateDefaultValues } from './hooks/useUpdateDefaultValues';

export const Form = () => {
    useUpdateDefaultValues();

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
