import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { MuiCore, Notistack, React } from '../../../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { MetadataTable } from './components/MetadataTable';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CDPipelineStageProps } from './types';

const { useSnackbar } = Notistack;
const { Box, Typography, Paper } = MuiCore;

export const CDPipelineStage = ({ stage }: CDPipelineStageProps): React.ReactElement => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const rows = useRows(stage);
    const columns = useColumns();
    const stageStatus = stage.status && stage.status.status;

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
        } = stage;

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
    }, [stageStatus, enqueueSnackbar, currentStageStatus, stage]);

    return (
        <Box className={classes.tablesGrid}>
            <div className={classes.tablesGridItem}>
                <div className={classes.tablesGridItemHeading}>
                    <Typography variant={'h5'}>General info</Typography>
                </div>
                <Paper className={classes.tablesGridItemInner}>
                    <HeadlampNameValueTable rows={rows} />
                </Paper>
            </div>
            <div className={classes.tablesGridItem}>
                <div className={classes.tablesGridItemHeading}>
                    <Typography variant={'h5'}>Quality gates</Typography>
                </div>
                <Paper className={classes.tablesGridItemInner}>
                    <HeadlampSimpleTable
                        columns={columns}
                        rowsPerPage={[15, 25, 50]}
                        data={stage.spec.qualityGates}
                    />
                </Paper>
            </div>
            <div className={classes.tablesGridItem}>
                <div className={classes.tablesGridItemHeading}>
                    <Typography variant={'h5'}>Metadata</Typography>
                </div>
                <Paper className={classes.tablesGridItemInner}>
                    <MetadataTable kubeObjectData={stage} />
                </Paper>
            </div>
        </Box>
    );
};
