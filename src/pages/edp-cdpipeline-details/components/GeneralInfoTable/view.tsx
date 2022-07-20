import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { MuiCore, pluginLib } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { GeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const GeneralInfoTable: React.FC<GeneralInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;
    const columns = useColumns(spec);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
