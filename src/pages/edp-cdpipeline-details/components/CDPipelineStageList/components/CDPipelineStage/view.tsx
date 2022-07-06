import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { MetadataTable } from './components/MetadataTable';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CDPipelineStageProps } from './types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;

const { Box, Typography, Paper } = MuiCore;

export const CDPipelineStage: React.FC<CDPipelineStageProps> = ({ stage }): React.ReactElement => {
    const classes = useStyles();
    const rows = useRows(stage);
    const columns = useColumns();

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
