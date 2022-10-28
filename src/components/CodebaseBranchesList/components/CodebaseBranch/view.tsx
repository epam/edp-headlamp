import { MuiCore, Notistack, React } from '../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const { useSnackbar } = Notistack;
const { Grid, Typography, Paper } = MuiCore;

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
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>General info</Typography>
                </div>
                <Paper className={classes.tableItemInner}>
                    <HeadlampNameValueTable rows={rows} />
                </Paper>
            </Grid>
        </Grid>
    );
};
