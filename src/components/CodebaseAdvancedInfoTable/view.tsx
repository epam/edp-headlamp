import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseAdvancedInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { Box } = MuiCore;

export const CodebaseAdvancedInfoTable = ({
    kubeObjectData,
}: CodebaseAdvancedInfoTableProps): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
    const columns = useColumns(spec, classes);

    return (
        <SectionBox title={<SectionHeader title={'Advanced Settings'} headerStyle="label" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
