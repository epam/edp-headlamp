import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { AdvancedInfoTableProps } from './types';

const {
    pluginLib: { React, MuiCore, CommonComponents },
} = globalThis;
const { NameValueTable, SectionBox, SectionHeader } = CommonComponents;
const { useTheme, Box } = MuiCore;

export const AdvancedInfoTable: React.FC<AdvancedInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
    const theme = useTheme();
    const columns = useColumns(spec, classes, theme);

    return (
        <SectionBox
            title={
                <SectionHeader title={'Advanced Settings'} noNamespaceFilter headerStyle="main" />
            }
        >
            <Box>
                <NameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
