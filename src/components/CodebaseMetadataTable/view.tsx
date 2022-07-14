import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseMetadataTableProps } from './types';

const {
    pluginLib: { React, MuiCore, CommonComponents },
} = globalThis;
const { SectionBox, SectionHeader } = CommonComponents;
const { useTheme, Box } = MuiCore;

export const CodebaseMetadataTable: React.FC<CodebaseMetadataTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { metadata } = kubeObjectData;

    const classes = useStyles();
    const theme = useTheme();
    const columns = useColumns(metadata, classes, theme);

    return (
        <SectionBox
            title={<SectionHeader title={'Metadata'} noNamespaceFilter headerStyle="main" />}
        >
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
