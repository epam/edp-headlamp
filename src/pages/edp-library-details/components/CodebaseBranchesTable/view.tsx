import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { CodebaseBranchesTableProps } from './types';

const {
    pluginLib: { React, CommonComponents, MuiCore },
} = globalThis;
const { SectionBox, SectionHeader } = CommonComponents;
const { Box } = MuiCore;

export const CodebaseBranchesTable: React.FC<CodebaseBranchesTableProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        metadata: { name },
    } = kubeObjectData;

    const [currentCodebaseBranches, setCurrentCodebaseBranches] =
        React.useState<EDPCodebaseBranchKubeObjectInterface>([]);
    const classes = useStyles();
    const columns = useColumns();

    React.useEffect(() => {
        EDPCodebaseBranchKubeObject.getCodebaseBranchesByCodebaseLabel(name, data =>
            setCurrentCodebaseBranches(data)
        );
    }, []);

    return (
        <SectionBox
            title={
                <div className={classes.tableHeaderActions}>
                    <SectionHeader title="Branches" noNamespaceFilter headerStyle="main" />
                    <TableHeaderActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />
                </div>
            }
        >
            <Box>
                <HeadlampSimpleTable
                    rowsPerPage={[15, 25, 50]}
                    columns={columns}
                    data={currentCodebaseBranches.items}
                />
            </Box>
        </SectionBox>
    );
};
