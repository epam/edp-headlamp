import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseGeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const CodebaseGeneralInfoTable: React.FC<CodebaseGeneralInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
    const columns = useColumns(spec, classes);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
