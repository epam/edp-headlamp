import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useEnrichedApplicationsData } from '../../provider';
import { useColumns } from './hooks/useColumns';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;

export const CDPipelineApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();
    const { enrichedApplications } = useEnrichedApplicationsData();

    return (
        <SectionBox title={<SectionHeader title={'Applications'} headerStyle="label" />}>
            <HeadlampSimpleTable data={enrichedApplications} columns={columns} />
        </SectionBox>
    );
};
