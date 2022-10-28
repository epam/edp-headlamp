import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { MuiCore, Notistack, React } from '../../../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { CurrentCDPipelineStageDataContext } from '../../view';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';

const { useSnackbar } = Notistack;
const { Grid, Typography, Paper } = MuiCore;

export const CDPipelineStage = (): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const generalInfoRows = useRows(CurrentCDPipelineStageDataContextValue);
    const qualityGatesColumns = useColumns();
    const stageStatus =
        CurrentCDPipelineStageDataContextValue.status &&
        CurrentCDPipelineStageDataContextValue.status.status;

    const [currentStageStatus, setCurrentStageStatus] = React.useState<{
        lastStatus: string;
        currentStatus: string;
    }>({
        lastStatus: null,
        currentStatus: stageStatus,
    });

    React.useEffect(() => {
        const { currentStatus } = currentStageStatus;
        const {
            metadata: { name },
        } = CurrentCDPipelineStageDataContextValue;

        // eslint-disable-next-line eqeqeq
        if (stageStatus == null || currentStatus === stageStatus) {
            return;
        }

        enqueueSnackbar(
            `Stage ${name} status has been changed to ${capitalizeFirstLetter(stageStatus)}`,
            {
                autoHideDuration: 5000,
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        );

        setCurrentStageStatus(prev => ({
            lastStatus: prev.currentStatus,
            currentStatus: stageStatus,
        }));
    }, [stageStatus, enqueueSnackbar, currentStageStatus, CurrentCDPipelineStageDataContextValue]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>Applications</Typography>
                </div>
                <Paper className={classes.tableItemInner}>
                    <CDPipelineStageApplicationsTable />
                </Paper>
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
