import { streamCodebaseBranchesByCodebaseLabel } from '../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { pluginLib, React } from '../../plugin.globals';
import { CodebaseBranch } from './components/CodebaseBranch';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CodebaseBranchesListProps } from './types';
import { isDefaultBranch } from './utils';
const {
    CommonComponents: { SectionHeader, EmptyContent },
} = pluginLib;

export const CodebaseBranchesList = ({
    codebaseData,
}: CodebaseBranchesListProps): React.ReactElement => {
    const {
        metadata: { name, namespace },
        spec: { defaultBranch },
    } = codebaseData;

    const classes = useStyles();
    const [currentCodebaseBranches, setCurrentCodebaseBranches] = React.useState<
        EDPCodebaseBranchKubeObjectInterface[]
    >([]);
    const [, setError] = React.useState<Error>(null);
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleStoreCodebaseBranches = React.useCallback(
        (data: EDPCodebaseBranchKubeObjectInterface[]) => {
            const sortedCodebaseBranches = data.sort(a =>
                isDefaultBranch(codebaseData, a) ? -1 : 1
            );
            setCurrentCodebaseBranches(sortedCodebaseBranches);
        },
        [setCurrentCodebaseBranches, codebaseData]
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebaseBranchesByCodebaseLabel(
            name,
            handleStoreCodebaseBranches,
            handleError,
            namespace
        );

        return () => cancelStream();
    }, [name, namespace, handleStoreCodebaseBranches, handleError]);

    return (
        <>
            <div className={classes.tableHeader}>
                <SectionHeader title="Branches" headerStyle="label" />
                <div className={classes.tableHeaderActions}>
                    <TableHeaderActions kubeObjectData={codebaseData} />
                </div>
            </div>
            {currentCodebaseBranches.length ? (
                currentCodebaseBranches.map(
                    (codebaseBranchData: EDPCodebaseBranchKubeObjectInterface, idx: number) => {
                        const branchId = `${codebaseBranchData.spec.branchName}:${idx}`;

                        return (
                            <CodebaseBranch
                                id={branchId}
                                codebaseBranchData={codebaseBranchData}
                                defaultBranch={defaultBranch}
                                expandedPanel={expandedPanel}
                                codebaseData={codebaseData}
                                handlePanelChange={handleChange}
                            />
                        );
                    }
                )
            ) : (
                <EmptyContent color={'textSecondary'}>No branches</EmptyContent>
            )}
        </>
    );
};
