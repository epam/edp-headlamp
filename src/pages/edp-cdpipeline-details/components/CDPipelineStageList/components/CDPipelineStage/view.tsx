import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { MetadataTable } from './components/MetadataTable';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CDPipelineStageProps } from './types';

const {
    pluginLib: { React, MuiCore, Notistack },
} = globalThis;

const { Box, Typography, Paper } = MuiCore;
const { useSnackbar } = Notistack;

export const CDPipelineStage: React.FC<CDPipelineStageProps> = ({ stage }): React.ReactElement => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const rows = useRows(stage);
    const columns = useColumns();

    const [stageStatus, setStageStatus] = React.useState<{
        lastStatus: string;
        currentStatus: string;
    }>({
        lastStatus: null,
        currentStatus: stage.status && stage.status.status,
    });

    React.useEffect(() => {
        const { currentStatus } = stageStatus;
        const {
            status,
            metadata: { name },
        } = stage;

        // eslint-disable-next-line eqeqeq
        if (status == null || currentStatus === status.status) {
            return;
        }

        enqueueSnackbar(
            `Stage ${name} status has been changed to ${capitalizeFirstLetter(status.status)}`,
            {
                autoHideDuration: 5000,
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        );

        setStageStatus(prev => ({
            lastStatus: prev.currentStatus,
            currentStatus: status.status,
        }));
    }, [stage.status && stage.status.status]);

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
