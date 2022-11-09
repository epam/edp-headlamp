import { MuiCore, React } from '../../../../plugin.globals';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const { Grid, Typography, Paper } = MuiCore;

export const CodebaseBranch = ({ codebaseBranch }: CodebaseBranchProps): React.ReactElement => {
    const classes = useStyles();
    const rows = useRows(codebaseBranch);

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
