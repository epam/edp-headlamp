import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { MetadataTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const MetadataTable = ({ kubeObjectData }: MetadataTableProps): React.ReactElement => {
    const { metadata } = kubeObjectData;
    const columns = useColumns(metadata);

    return (
        <SectionBox title={<SectionHeader title={'Metadata'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
