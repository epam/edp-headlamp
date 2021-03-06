import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { MuiCore, pluginLib } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { GeneralInfoTableProps } from './types';

const {
    CommonComponents: { SectionBox, SectionHeader },
} = pluginLib;
const { useTheme, Box } = MuiCore;

export const GeneralInfoTable: React.FC<GeneralInfoTableProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
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
