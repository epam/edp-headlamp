import ErrorBoundary from '../../../../../../../../components/ErrorBoundary';
import { HeadlampSimpleTable } from '../../../../../../../../components/HeadlampSimpleTable';
import { React } from '../../../../../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const CDPipelineStageApplicationsTable = ({
    enrichedApplicationsWithArgoApplications,
    qualityGatePipelineIsRunning,
}): React.ReactElement => {
    const columns = useColumns(qualityGatePipelineIsRunning);
    const classes = useStyles();

    return (
        <ErrorBoundary>
            <div className={classes.tableRoot}>
                <HeadlampSimpleTable
                    data={enrichedApplicationsWithArgoApplications}
                    columns={columns}
                />
            </div>
        </ErrorBoundary>
    );
};
