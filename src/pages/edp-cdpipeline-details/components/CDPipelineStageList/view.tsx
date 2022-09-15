import { StatusIcon } from '../../../../components/StatusIcon';
import { ICON_ARROW_DOWN } from '../../../../constants/icons';
import { STATUS_UNKNOWN } from '../../../../constants/statuses';
import {
    EDPCDPipelineStageKubeObject,
    streamCDPipelineStagesByCDPipelineName,
} from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';
import { CDPipelineStagesListProps } from './types';

const {
    CommonComponents: { SectionHeader },
} = pluginLib;
const { Icon } = Iconify;
const { Accordion, AccordionSummary, AccordionDetails, Typography } = MuiCore;

export const CDPipelineStagesList: React.FC<CDPipelineStagesListProps> = ({
    CDPipelineData,
}): React.ReactElement => {
    const {
        metadata: { name, namespace },
    } = CDPipelineData;

    const classes = useStyles();
    const [currentCDPipelineStages, setCurrentCDPipelineStages] = React.useState<
        EDPCDPipelineStageKubeObjectInterface[]
    >([]);
    const [, setError] = React.useState<Error>(null);
    const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleStoreCDPipelineStages = React.useCallback(
        (data: EDPCDPipelineStageKubeObjectInterface[]) => {
            const sortedCDPipelineStages = data.sort((a, b) => a.spec.order - b.spec.order);
            setCurrentCDPipelineStages(sortedCDPipelineStages);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCDPipelineStagesByCDPipelineName(
            name,
            handleStoreCDPipelineStages,
            handleError,
            namespace
        );

        return () => cancelStream();
    }, [handleError, handleStoreCDPipelineStages, name, namespace]);

    return (
        <>
            <div className={classes.tableHeaderActions}>
                <SectionHeader title="Stages" headerStyle="main" />
                <TableHeaderActions
                    currentCDPipelineStages={currentCDPipelineStages}
                    CDPipelineData={CDPipelineData}
                />
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
                                    <StatusIcon
                                        status={el.status ? el.status.status : STATUS_UNKNOWN}
                                    />
                                    <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                                        {el.spec.name}
                                    </Typography>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <CDPipelineStageActions
                                            kubeObject={EDPCDPipelineStageKubeObject}
                                            kubeObjectData={el}
                                            CDPipelineStages={currentCDPipelineStages}
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
