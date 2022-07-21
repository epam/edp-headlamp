import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseGeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { useTheme, Box } = MuiCore;

export const CodebaseGeneralInfoTable: React.FC<CodebaseGeneralInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = React.useMemo(() => useStyles(spec), [spec]);
    const theme = useTheme();
    const columns = useColumns(spec, classes, theme);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
