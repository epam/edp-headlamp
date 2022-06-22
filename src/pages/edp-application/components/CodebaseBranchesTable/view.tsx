import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { selectCodebaseBranchesByCodebaseLabel } from '../../../../k8s/EDPCodebaseBranch';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseBranchesTableProps } from './types';

const {
    pluginLib: { React, CommonComponents, MuiCore },
} = window;
const { SimpleTable, SectionBox, SectionHeader } = CommonComponents;
const { Box } = MuiCore;

export const CodebaseBranchesTable: React.FC<CodebaseBranchesTableProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        metadata: { name },
    } = kubeObjectData || ({} as KubeObjectInterface);

    const [currentCodebaseBranches, setCurrentCodebaseBranches] = React.useState(name);
    const classes = useStyles();
    const columns = useColumns(classes);

    React.useEffect(() => {
        selectCodebaseBranchesByCodebaseLabel(name, data => setCurrentCodebaseBranches(data));
    }, []);

    return (
        <SectionBox
            title={
                <div className={classes.tableHeaderActions}>
                    <SectionHeader title="Branches" noNamespaceFilter headerStyle="main" />
                    <TableHeaderActions kubeObject={kubeObject} codebaseName={name} />
                </div>
            }
        >
            <Box>
                <SimpleTable
                    rowsPerPage={[15, 25, 50]}
                    columns={columns}
                    data={currentCodebaseBranches.items}
                />
            </Box>
        </SectionBox>
    );
};
