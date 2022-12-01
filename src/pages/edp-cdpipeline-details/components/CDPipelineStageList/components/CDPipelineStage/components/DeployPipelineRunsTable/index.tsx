import ErrorBoundary from '../../../../../../../../components/ErrorBoundary/view';
import { HeadlampSimpleTable } from '../../../../../../../../components/HeadlampSimpleTable';
import { React } from '../../../../../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';

export const CDPipelineStageApplicationsTable = ({
    enrichedApplicationsWithArgoApplications,
}): React.ReactElement => {
    const columns = useColumns();

    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={enrichedApplicationsWithArgoApplications}
                columns={columns}
            />
        </ErrorBoundary>
    );
};
