import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseAdvancedInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { useTheme, Box } = MuiCore;

export const CodebaseAdvancedInfoTable: React.FC<CodebaseAdvancedInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
    const theme = useTheme();
    const columns = useColumns(spec, classes, theme);

    return (
        <SectionBox title={<SectionHeader title={'Advanced Settings'} headerStyle="main" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
