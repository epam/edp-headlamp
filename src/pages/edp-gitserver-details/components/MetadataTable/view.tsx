import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { MetadataTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const MetadataTable = ({ gitServerData }: MetadataTableProps): React.ReactElement => {
    const { metadata } = gitServerData;
    const columns = useColumns(metadata);

    return (
        <SectionBox title={<SectionHeader title={'Metadata'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
