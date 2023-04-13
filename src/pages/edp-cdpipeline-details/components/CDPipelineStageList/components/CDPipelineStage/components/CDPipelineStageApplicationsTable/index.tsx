import { HeadlampSimpleTable } from '../../../../../../../../components/HeadlampSimpleTable';
import { React } from '../../../../../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const CDPipelineStageApplicationsTable = ({
    enrichedApplicationsWithArgoApplications,
    qualityGatePipelineIsRunning,
    argoCDURLOrigin,
}): React.ReactElement => {
    const columns = useColumns(qualityGatePipelineIsRunning, argoCDURLOrigin);
    const classes = useStyles();
    return (
        <div className={classes.tableRoot}>
            <HeadlampSimpleTable
                data={enrichedApplicationsWithArgoApplications}
                columns={columns}
            />
        </div>
    );
};
