import { MuiCore, Notistack, React } from '../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { MetadataTable } from './components/MetadataTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const { useSnackbar } = Notistack;
const { Box, Typography, Paper } = MuiCore;

export const CodebaseBranch = ({ codebaseBranch }: CodebaseBranchProps): React.ReactElement => {
    const {
        spec: { branchName },
    } = codebaseBranch;
    const codebaseBranchStatus = codebaseBranch.status ? codebaseBranch.status.status : '';

    const [currentCodebaseBranchStatus, setCurrentCodebaseBranchStatus] = React.useState<{
        lastStatus: string;
        currentStatus: string;
    }>({
        lastStatus: null,
        currentStatus: codebaseBranchStatus,
    });
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const rows = useRows(codebaseBranch);

    React.useEffect(() => {
        const { currentStatus } = currentCodebaseBranchStatus;

        if (currentStatus !== codebaseBranchStatus) {
            enqueueSnackbar(
                `Branch ${branchName} status has been changed to ${capitalizeFirstLetter(
                    codebaseBranchStatus
                )}`,
                {
                    autoHideDuration: 5000,
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }
            );

            setCurrentCodebaseBranchStatus(prev => ({
                lastStatus: prev.currentStatus,
                currentStatus: codebaseBranchStatus,
            }));
        }
    }, [
        codebaseBranch,
        currentCodebaseBranchStatus,
        enqueueSnackbar,
        codebaseBranchStatus,
        branchName,
    ]);

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
