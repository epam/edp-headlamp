import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseMetadataTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { useTheme, Box } = MuiCore;

export const CodebaseMetadataTable: React.FC<CodebaseMetadataTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { metadata } = kubeObjectData;

    const classes = useStyles();
    const theme = useTheme();
    const columns = useColumns(metadata, classes, theme);

    return (
        <SectionBox title={<SectionHeader title={'Metadata'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
