import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useRows } from './hooks/useRows';
import { CodebaseGeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const CodebaseGeneralInfoTable = ({
    codebaseData,
}: CodebaseGeneralInfoTableProps): React.ReactElement => {
    const columns = useRows(codebaseData);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="label" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
