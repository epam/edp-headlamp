import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { MetadataTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { useTheme, Box } = MuiCore;

export const MetadataTable: React.FC<MetadataTableProps> = ({
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
