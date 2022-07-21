import LeakyBucket from 'leaky-bucket';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICON_ARROW_DOWN } from '../../../../constants/icons';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CDPipelineStagesTableProps } from './types';

const {
    CommonComponents: { SectionHeader },
} = pluginLib;
const { Icon } = Iconify;
const { Accordion, AccordionSummary, AccordionDetails, Typography } = MuiCore;

export const CDPipelineStagesTable: React.FC<CDPipelineStagesTableProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const {
        metadata: { name },
    } = kubeObjectData;

    const classes = useStyles();
    const [currentCDPipelineStages, setCurrentCDPipelineStages] = React.useState<
        EDPCDPipelineStageKubeObjectInterface[]
    >([]);
    const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const reqErrorCost = 1;
    const reqErrorsBucket = new LeakyBucket({
        capacity: 10,
    });

    const updateCDPipelineStages = React.useCallback(async () => {
        if (reqErrorsBucket.getCurrentCapacity()) {
            try {
                const { items } =
                    await EDPCDPipelineStageKubeObject.getCDPipelineStagesByCDPipelineName(name);
                const sortedItems = items.sort((a, b) => a.spec.order - b.spec.order);
                setCurrentCDPipelineStages(sortedItems);
            } catch (err: any) {
                reqErrorsBucket.pay(reqErrorCost);
                const { message } = err;
                const { status } = JSON.parse(JSON.stringify(err));
                throw new Error(`${message}. Status: ${status}`);
            }
        }
    }, [EDPCDPipelineStageKubeObject, setCurrentCDPipelineStages]);

    React.useEffect(() => {
        updateCDPipelineStages().catch(console.error);
    }, []);

    return (
        <>
            <div className={classes.tableHeaderActions}>
                <SectionHeader title="CD Pipeline Stages" headerStyle="main" />
                <TableHeaderActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />
            </div>
            {currentCDPipelineStages.map((el, idx) => {
                const stageId = `${el.spec.name}:${idx}`;

                return (
                    <div style={{ paddingBottom: rem(16) }} key={stageId}>
                        <Accordion
                            expanded={expandedPanel === stageId}
                            onChange={handleChange(stageId)}
                        >
                            <AccordionSummary expandIcon={<Icon icon={ICON_ARROW_DOWN} />}>
                                <div className={classes.stageHeading}>
                                    {el.status && <StatusIcon status={el.status.status} />}
                                    <Typography variant={'h5'}>{el.spec.name}</Typography>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <CDPipelineStageActions
                                            kubeObject={EDPCDPipelineStageKubeObject}
                                            kubeObjectData={el}
                                            cdpipelineStages={currentCDPipelineStages}
                                        />
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <CDPipelineStage stage={el} />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}
        </>
    );
};
