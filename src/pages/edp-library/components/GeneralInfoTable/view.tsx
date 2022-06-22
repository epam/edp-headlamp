import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { GeneralInfoTableProps } from './types';

const {
    pluginLib: { React, MuiCore, CommonComponents },
} = globalThis;
const { NameValueTable, SectionBox, SectionHeader } = CommonComponents;
const { useTheme, Box } = MuiCore;

export const GeneralInfoTable: React.FC<GeneralInfoTableProps> = ({
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
                <NameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
