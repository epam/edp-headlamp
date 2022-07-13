import { StatusIcon } from '../../../../components/StatusIcon/view';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { filterCDPStagesByCDPName } from '../../../../k8s/EDPCDPipelineStage/utils/filterCDPStagesByCDPName';
import { rem } from '../../../../utils/styling/rem';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CDPipelineStagesTableProps } from './types';

const {
    pluginLib: { React, CommonComponents, MuiCore, Iconify },
} = globalThis;
const { SectionHeader } = CommonComponents;
const { Accordion, AccordionSummary, AccordionDetails, Typography } = MuiCore;
const { Icon } = Iconify;

export const CDPipelineStagesTable: React.FC<CDPipelineStagesTableProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const classes = useStyles();
    const [currentCDPipelineStages, setCurrentCDPipelineStages] = React.useState<
        EDPCDPipelineStageKubeObjectInterface[]
    >([]);
    const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    React.useEffect(() => {
        EDPCDPipelineStageKubeObject.getList(data => {
            const filteredCDPipelineStages = filterCDPStagesByCDPName(
                data,
                kubeObjectData.metadata.name
            );
            setCurrentCDPipelineStages(filteredCDPipelineStages);
        });
    }, []);

    return (
        <>
            <div className={classes.tableHeaderActions}>
                <SectionHeader title="CD Pipeline Stages" noNamespaceFilter headerStyle="main" />
                <TableHeaderActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />
            </div>
            {currentCDPipelineStages.map((el, idx) => {
                const stageId = `${el.spec.name}:${idx}`;

                return (
                    <div style={{ paddingBottom: rem(16) }}>
                        <Accordion
                            expanded={expandedPanel === stageId}
                            onChange={handleChange(stageId)}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <Icon
                                        icon={
                                            expandedPanel
                                                ? 'dashicons:arrow-down-alt2'
                                                : 'dashicons:arrow-down-alt2'
                                        }
                                    />
                                }
                            >
                                <div className={classes.stageHeading}>
                                    {el.status && <StatusIcon status={el.status.status} />}
                                    <Typography variant={'h5'}>{el.spec.name}</Typography>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <CDPipelineStageActions
                                            kubeObject={EDPCDPipelineStageKubeObject}
                                            kubeObjectData={el}
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
