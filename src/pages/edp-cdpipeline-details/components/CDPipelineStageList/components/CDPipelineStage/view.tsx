import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { CurrentCDPipelineStageDataContext } from '../../view';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';

const { Grid, Typography, Paper } = MuiCore;

export const CDPipelineStage = (): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );

    const classes = useStyles();
    const generalInfoRows = useRows(CurrentCDPipelineStageDataContextValue);
    const qualityGatesColumns = useColumns();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>Applications</Typography>
                </div>
                <CDPipelineStageApplicationsTable />
            </Grid>
            <Grid item xs={12} lg={6}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>General info</Typography>
                </div>
                <Paper className={classes.tableItemInner}>
                    <HeadlampNameValueTable rows={generalInfoRows} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>Quality gates</Typography>
                </div>
                <Paper className={classes.tableItemInner}>
                    <HeadlampSimpleTable
                        columns={qualityGatesColumns}
                        rowsPerPage={[15, 25, 50]}
                        data={CurrentCDPipelineStageDataContextValue.spec.qualityGates}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};
