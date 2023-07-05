import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useCDPipelineStagesContext } from '../../providers/CDPipelineStages/hooks';
import { TableHeaderActions } from '../TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const StageList = () => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const { stages } = useCDPipelineStagesContext();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant={'h5'}>Stages</Typography>
                    </Grid>
                    <Grid item>
                        <TableHeaderActions CDPipelineStages={stages} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.tableRoot}>
                    <HeadlampSimpleTable columns={columns} rowsPerPage={[10]} data={stages} />
                </Paper>
            </Grid>
        </Grid>
    );
};
