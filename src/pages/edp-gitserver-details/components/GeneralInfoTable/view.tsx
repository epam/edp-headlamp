import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { GeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const GeneralInfoTable = ({ gitServerData }: GeneralInfoTableProps): React.ReactElement => {
    const { spec } = gitServerData;

    const columns = useColumns(spec);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
