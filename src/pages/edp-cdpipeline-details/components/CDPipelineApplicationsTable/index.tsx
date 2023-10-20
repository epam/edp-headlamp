import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Table } from '../../../../components/Table';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { useColumns } from './hooks/useColumns';

export const CDPipelineApplicationsTable = () => {
    const columns = useColumns();
    const { enrichedApplications } = useDynamicDataContext();

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
                    rowsPerPage={5}
                />
            </Grid>
        </Grid>
    );
};
