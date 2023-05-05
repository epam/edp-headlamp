import { Render } from '../../../../components/Render';
import { ResourceIconLink } from '../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useEDPComponentsURLs } from '../../../../hooks/useEDPComponentsURLs';
import { useGitServers } from '../../../../hooks/useGitServers';
import { streamCDPipelineStagesByCDPipelineName } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { Iconify, MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { rem } from '../../../../utils/styling/rem';
import { createArgoCDStageLink } from '../../../../utils/url/createArgoCDStageLink';
import { createGrafanaLink } from '../../../../utils/url/createGrafanaLink';
import { createKibanaLink } from '../../../../utils/url/createKibanaLink';
import { CDPipelineDataContext } from '../../index';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
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
    const EDPComponentsURLS = useEDPComponentsURLs();

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
                const status = el.status ? el.status.status : CUSTOM_RESOURCE_STATUSES['UNKNOWN'];
                const argoCDStageLink = Object.hasOwn(EDPComponentsURLS, 'argocd')
                    ? createArgoCDStageLink(
                          EDPComponentsURLS?.argocd,
                          CDPipelineData?.metadata?.name,
                          el.spec.name
                      )
                    : null;

                const grafanaLink = Object.hasOwn(EDPComponentsURLS, 'grafana')
                    ? createGrafanaLink(EDPComponentsURLS?.grafana, el.spec.namespace)
                    : null;
                const kibanaLink = Object.hasOwn(EDPComponentsURLS, 'kibana')
                    ? createKibanaLink(EDPComponentsURLS?.kibana, el.spec.namespace)
                    : null;

                const statusTitle = (
                    <>
                        <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                            {capitalizeFirstLetter(status)}
                        </Typography>
                        <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                            <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                {el?.status?.detailed_message}
                            </Typography>
                        </Render>
                    </>
                );
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
                                                        status={status}
                                                        customTitle={statusTitle}
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
                                                                <ResourceIconLink
                                                                    icon={ICONS.ARGOCD}
                                                                    tooltipTitle={'Open in ArgoCD'}
                                                                    link={argoCDStageLink}
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <ResourceIconLink
                                                                    icon={ICONS.GRAFANA}
                                                                    tooltipTitle={'Open in Grafana'}
                                                                    link={grafanaLink}
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <ResourceIconLink
                                                                    icon={ICONS.KIBANA}
                                                                    tooltipTitle={'Open in Kibana'}
                                                                    link={kibanaLink}
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <ResourceIconLink
                                                                    icon={ICONS.KUBERNETES}
                                                                    tooltipTitle={'In cluster'}
                                                                    link={null}
                                                                />
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
