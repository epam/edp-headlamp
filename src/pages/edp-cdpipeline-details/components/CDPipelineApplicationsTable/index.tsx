import ErrorBoundary from '../../../../components/ErrorBoundary';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { ApplicationsContext } from '../../index';
import { useColumns } from './hooks/useColumns';

const { Box } = MuiCore;
const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;

export const CDPipelineApplicationsTable = (): React.ReactElement => {
    const columns = useColumns();

    const applications = React.useContext(ApplicationsContext);

    return (
        <SectionBox title={<SectionHeader title={'Applications'} headerStyle="label" />}>
            <Box>
                <ErrorBoundary>
                    <HeadlampSimpleTable data={applications} columns={columns} />
                </ErrorBoundary>
            </Box>
        </SectionBox>
    );
};
