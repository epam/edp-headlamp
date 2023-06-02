import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { useColumns } from './hooks/useColumns';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;

export const CDPipelineApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();
    const { enrichedApplications } = useEnrichedApplicationsContext();

    return (
        <SectionBox title={<SectionHeader title={'Applications'} headerStyle="label" />}>
            <HeadlampSimpleTable data={enrichedApplications} columns={columns} />
        </SectionBox>
    );
};
