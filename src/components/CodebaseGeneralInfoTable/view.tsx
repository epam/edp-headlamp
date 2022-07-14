import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseGeneralInfoTableProps } from './types';

const {
    pluginLib: { React, MuiCore, CommonComponents },
} = globalThis;
const { SectionBox, SectionHeader } = CommonComponents;
const { useTheme, Box } = MuiCore;

export const CodebaseGeneralInfoTable: React.FC<CodebaseGeneralInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = React.useMemo(() => useStyles(spec), [spec]);
    const theme = useTheme();
    const columns = useColumns(spec, classes, theme);

    return (
        <SectionBox
            title={<SectionHeader title={'General Info'} noNamespaceFilter headerStyle="main" />}
        >
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
