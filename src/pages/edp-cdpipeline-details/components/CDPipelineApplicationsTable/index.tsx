import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Table } from '../../../../components/Table';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { useColumns } from './hooks/useColumns';

export const CDPipelineApplicationsTable = () => {
    const columns = useColumns();
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
                <Table
                    data={enrichedApplications}
                    columns={columns}
                    isLoading={!enrichedApplications}
                />
            </Grid>
        </Grid>
    );
};
