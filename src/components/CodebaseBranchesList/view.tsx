import { ICON_ARROW_DOWN } from '../../constants/icons';
import { STATUS_UNKNOWN } from '../../constants/statuses';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import {
    EDPCodebaseBranchKubeObject,
    streamCodebaseBranchesByCodebaseLabel,
} from '../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { Iconify, MuiCore, pluginLib, React } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { Render } from '../Render';
import { StatusIcon } from '../StatusIcon';
import { CodebaseBranch } from './components/CodebaseBranch';
import { CodebaseBranchActions } from './components/CodebaseBranchActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CodebaseBranchesListProps } from './types';
const {
    CommonComponents: { SectionHeader },
} = pluginLib;
const { Accordion, AccordionSummary, AccordionDetails, Typography } = MuiCore;
const { Icon } = Iconify;

const isDefaultBranch = (
    codebase: EDPCodebaseKubeObjectInterface,
    codebaseBranch: EDPCodebaseBranchKubeObjectInterface
) => codebase.spec.defaultBranch === codebaseBranch.spec.branchName;

export const CodebaseBranchesList: React.FC<CodebaseBranchesListProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        metadata: { name, namespace },
        spec: { defaultBranch },
    } = kubeObjectData;

    const classes = useStyles();
    const [currentCodebaseBranches, setCurrentCodebaseBranches] = React.useState<
        EDPCodebaseBranchKubeObjectInterface[]
    >([]);
    const [, setError] = React.useState<string>('');
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleStoreCodebaseBranches = React.useCallback(
        (data: EDPCodebaseBranchKubeObjectInterface[]) => {
            const sortedCodebaseBranches = data.sort(a =>
                isDefaultBranch(kubeObjectData, a) ? -1 : 1
            );
            setCurrentCodebaseBranches(sortedCodebaseBranches);
        },
        [setCurrentCodebaseBranches, kubeObjectData]
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
            <div className={classes.tableHeaderActions}>
                <SectionHeader title="Branches" headerStyle="main" />
                <TableHeaderActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />
            </div>
            {currentCodebaseBranches.map(
                (el: EDPCodebaseBranchKubeObjectInterface, idx: number) => {
                    const stageId = `${el.spec.branchName}:${idx}`;

                    return (
                        <div style={{ paddingBottom: rem(16) }} key={stageId}>
                            <Accordion
                                expanded={expandedPanel === stageId}
                                onChange={handleChange(stageId)}
                            >
                                <AccordionSummary expandIcon={<Icon icon={ICON_ARROW_DOWN} />}>
                                    <div className={classes.stageHeading}>
                                        <StatusIcon
                                            status={el.status ? el.status.status : STATUS_UNKNOWN}
                                        />
                                        <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                                            {el.spec.branchName}
                                        </Typography>
                                        <Render condition={isDefaultBranch(kubeObjectData, el)}>
                                            <Typography variant={'subtitle2'}>
                                                default branch
                                            </Typography>
                                        </Render>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <CodebaseBranchActions
                                                kubeObject={EDPCodebaseBranchKubeObject}
                                                kubeObjectData={el}
                                                defaultBranch={defaultBranch}
                                                codebase={kubeObjectData}
                                            />
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CodebaseBranch codebaseBranch={el} />
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    );
                }
            )}
        </>
    );
};
