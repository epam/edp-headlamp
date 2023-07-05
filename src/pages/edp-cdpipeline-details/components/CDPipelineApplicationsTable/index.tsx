import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const CDPipelineApplicationsTable = () => {
    const columns = useColumns();
    const classes = useStyles();
    const { enrichedApplications } = useEnrichedApplicationsContext();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant={'h5'}>Applications</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.tableRoot}>
                    <HeadlampSimpleTable data={enrichedApplications} columns={columns} />
                </Paper>
            </Grid>
        </Grid>
    );
};
