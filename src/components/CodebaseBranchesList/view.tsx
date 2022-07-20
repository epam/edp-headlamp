import LeakyBucket from 'leaky-bucket';
import { useInterval } from 'react-use';
import { REFETCH_DELAY } from '../../constants/delays';
import { ICON_ARROW_DOWN } from '../../constants/icons';
import { EDPCodebaseBranchKubeObject } from '../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { rem } from '../../utils/styling/rem';
import { StatusIcon } from '../StatusIcon';
import { CodebaseBranch } from './components/CodebaseBranch';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CodebaseBranchesListProps } from './types';

const {
    pluginLib: { React, CommonComponents, MuiCore, Iconify },
} = globalThis;
const { SectionHeader } = CommonComponents;
const { Accordion, AccordionSummary, AccordionDetails, Typography } = MuiCore;
const { Icon } = Iconify;

export const CodebaseBranchesList: React.FC<CodebaseBranchesListProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        metadata: { name },
    } = kubeObjectData;

    const classes = useStyles();
    const [currentCodebaseBranches, setCurrentCodebaseBranches] = React.useState<
        EDPCodebaseBranchKubeObjectInterface[]
    >([]);
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const reqErrorCost = 1;
    const reqErrorsBucket = new LeakyBucket({
        capacity: 10,
    });

    const updateCodebaseBranches = React.useCallback(async () => {
        if (reqErrorsBucket.getCurrentCapacity()) {
            try {
                const { items } =
                    await EDPCodebaseBranchKubeObject.getCodebaseBranchesByCodebaseLabel(name);
                setCurrentCodebaseBranches(items);
            } catch (err: any) {
                reqErrorsBucket.pay(reqErrorCost);
                const { message } = err;
                const { status } = JSON.parse(JSON.stringify(err));
                throw new Error(`${message}. Status: ${status}`);
            }
        }
    }, [EDPCodebaseBranchKubeObject, setCurrentCodebaseBranches]);

    React.useEffect(() => {
        updateCodebaseBranches().catch(console.error);
    }, []);

    useInterval(updateCodebaseBranches, REFETCH_DELAY);

    return (
        <>
            <div className={classes.tableHeaderActions}>
                <SectionHeader title="Branches" noNamespaceFilter headerStyle="main" />
                <TableHeaderActions
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                    onCreate={updateCodebaseBranches}
                />
            </div>
            {currentCodebaseBranches.map((el, idx) => {
                const stageId = `${el.metadata.name}:${idx}`;

                return (
                    <div style={{ paddingBottom: rem(16) }}>
                        <Accordion
                            expanded={expandedPanel === stageId}
                            onChange={handleChange(stageId)}
                        >
                            <AccordionSummary expandIcon={<Icon icon={ICON_ARROW_DOWN} />}>
                                <div className={classes.stageHeading}>
                                    {el.status && <StatusIcon status={el.status.status} />}
                                    <Typography variant={'h6'}>{el.metadata.name}</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <CodebaseBranch codebaseBranch={el} />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}
        </>
    );
};
