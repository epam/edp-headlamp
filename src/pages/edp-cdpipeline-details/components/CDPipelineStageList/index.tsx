import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useGitServers } from '../../../../hooks/useGitServers';
import { streamCDPipelineStagesByCDPipelineName } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { Iconify, MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';
import { CDPipelineDataContext } from '../../index';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
import { CDPipelineStageMetadataTable } from './components/CDPipelineStageMetadataTable';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useStyles } from './styles';

const {
    CommonComponents: { SectionHeader },
} = pluginLib;
const { Icon } = Iconify;
const { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } = MuiCore;

export const CDPipelineStagesDataContext =
    React.createContext<EDPCDPipelineStageKubeObjectInterface[]>(null);
export const CurrentCDPipelineStageDataContext =
    React.createContext<EDPCDPipelineStageKubeObjectInterface>(null);
export const GitServersDataContext = React.createContext<EDPGitServerKubeObjectInterface[]>(null);

export const CDPipelineStagesList = (): React.ReactElement => {
    const CDPipelineData = React.useContext(CDPipelineDataContext);
    const {
        metadata: { name, namespace },
    } = CDPipelineData;

    const classes = useStyles();
    const [CDPipelineStages, setCurrentCDPipelineStages] = React.useState<
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

    const { gitServers } = useGitServers({ namespace });

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
                <SectionHeader title="Stages" headerStyle="label" />
                <TableHeaderActions CDPipelineStages={CDPipelineStages} />
            </div>
            {CDPipelineStages.map((el, idx) => {
                const stageId = `${el.spec.name}:${idx}`;

                return (
                    <React.Fragment key={stageId}>
                        <CDPipelineStagesDataContext.Provider value={CDPipelineStages}>
                            <CurrentCDPipelineStageDataContext.Provider value={el}>
                                <GitServersDataContext.Provider value={gitServers}>
                                    <div style={{ paddingBottom: rem(16) }}>
                                        <Accordion
                                            expanded={expandedPanel === stageId}
                                            onChange={handleChange(stageId)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}
                                                className={classes.accordionSummary}
                                            >
                                                <div className={classes.stageHeading}>
                                                    <StatusIcon
                                                        status={
                                                            el.status
                                                                ? el.status.status
                                                                : CUSTOM_RESOURCE_STATUSES[
                                                                      'UNKNOWN'
                                                                  ]
                                                        }
                                                    />
                                                    <Typography
                                                        variant={'h6'}
                                                        style={{ lineHeight: 1 }}
                                                    >
                                                        {el.spec.name}
                                                    </Typography>
                                                    <div style={{ marginLeft: 'auto' }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <CDPipelineStageMetadataTable />
                                                            </Grid>
                                                            <Grid item>
                                                                <CDPipelineStageActions />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <CDPipelineStage />
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </GitServersDataContext.Provider>
                            </CurrentCDPipelineStageDataContext.Provider>
                        </CDPipelineStagesDataContext.Provider>
                    </React.Fragment>
                );
            })}
        </>
    );
};
