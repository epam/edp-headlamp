import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { GeneralInfoTableProps } from './types';

const {
    pluginLib: { React, MuiCore, CommonComponents },
} = window;
const { NameValueTable, SectionBox, SectionHeader } = CommonComponents;
const { useTheme, Box } = MuiCore;

export const GeneralInfoTable: React.FC<GeneralInfoTableProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        spec,
        metadata: { name },
    } = kubeObjectData || ({} as KubeObjectInterface);

    const classes = React.useMemo(() => useStyles(spec), [spec]);
    const theme = useTheme();
    const columns = useColumns(spec, classes, theme);

    return (
        <SectionBox
            title={
                <SectionHeader
                    title={`${name} General Info`}
                    noNamespaceFilter
                    headerStyle="main"
                    actions={[
                        <TableHeaderActions
                            kubeObject={kubeObject}
                            kubeObjectData={kubeObjectData}
                        />,
                    ]}
                />
            }
        >
            <Box>
                <NameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
