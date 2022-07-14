import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { MetadataTable } from './components/MetadataTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const {
    pluginLib: { React, MuiCore, Notistack },
} = globalThis;

const { Box, Typography, Paper } = MuiCore;
const { useSnackbar } = Notistack;

export const CodebaseBranch: React.FC<CodebaseBranchProps> = ({
    codebaseBranch,
}): React.ReactElement => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const rows = useRows(codebaseBranch);
    const [codebaseBranchStatus, setCodebaseBranchStatus] = React.useState<{
        lastStatus: string;
        currentStatus: string;
    }>({
        lastStatus: null,
        currentStatus: codebaseBranch.status.status,
    });

    React.useEffect(() => {
        const { currentStatus } = codebaseBranchStatus;
        const {
            status: { status },
            metadata: { name },
        } = codebaseBranch;

        if (currentStatus !== status) {
            enqueueSnackbar(
                `Branch ${name} status has been changed to ${capitalizeFirstLetter(status)}`,
                {
                    autoHideDuration: 5000,
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }
            );

            setCodebaseBranchStatus(prev => ({
                lastStatus: prev.currentStatus,
                currentStatus: status,
            }));
        }
    }, [codebaseBranch.status.status]);

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
                    <Typography variant={'h5'}>Metadata</Typography>
                </div>
                <Paper className={classes.tablesGridItemInner}>
                    <MetadataTable kubeObjectData={codebaseBranch} />
                </Paper>
            </div>
        </Box>
    );
};
