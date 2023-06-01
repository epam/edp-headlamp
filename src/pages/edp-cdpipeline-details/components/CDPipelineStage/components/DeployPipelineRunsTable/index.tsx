import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { React } from '../../../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';

export const CDPipelineStageApplicationsTable = ({
    enrichedApplicationsWithArgoApplications,
}): React.ReactElement => {
    const columns = useColumns();

    return (
        <HeadlampSimpleTable data={enrichedApplicationsWithArgoApplications} columns={columns} />
    );
};
