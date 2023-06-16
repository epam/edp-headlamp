import { Render } from '../../components/Render';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { ICONS } from '../../constants/icons';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { createArgoCDPipelineLink } from '../../utils/url/createArgoCDPipelineLink';
import { CDPipelineActions } from './components/CDPipelineActions';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { CDPipelineStage } from './components/CDPipelineStage';
import { CDPipelineStageActions } from './components/CDPipelineStageActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useCDPipelineContext } from './providers/CDPipeline/hooks';
import { CDPipelineStageContextProvider } from './providers/CDPipelineStage/provider';
import { useCDPipelineStagesContext } from './providers/CDPipelineStages/hooks';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Grid, Button } = MuiCore;

const { useParams } = ReactRouter;
const {
    CommonComponents: { Link, SectionHeader },
} = pluginLib;

export const EDPCDPipelineDetails = () => {
    const { name } = useParams<{
        namespace?: string;
        name?: string;
    }>();
    const classes = useStyles();

    const { CDPipeline } = useCDPipelineContext();

    const { stages } = useCDPipelineStagesContext();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const argoCDPipelineLink = React.useMemo(
        () => createArgoCDPipelineLink(EDPComponentsURLS, name),
        [EDPComponentsURLS, name]
    );

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
    const handleAccordionChange = React.useCallback(
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPanel(isExpanded ? panel : null);
        },
        []
    );

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(CDPIPELINES_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                <div style={{ marginLeft: 'auto' }}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <ResourceIconLink
                                tooltipTitle={'Open in ArgoCD'}
                                icon={ICONS.ARGOCD}
                                link={argoCDPipelineLink}
                            />
                        </Grid>
                        <Render condition={!!CDPipeline}>
                            <>
                                <Grid item>
                                    <CDPipelineMetadataTable CDPipelineData={CDPipeline} />
                                </Grid>
                                <Grid item>
                                    <CDPipelineActions CDPipeline={CDPipeline} />
                                </Grid>
                            </>
                        </Render>
                    </Grid>
                </div>
            </div>
            <Render condition={!!CDPipeline}>
                <>
                    <CDPipelineApplicationsTable />
                    <div className={classes.tableHeaderActions}>
                        <SectionHeader title="Stages" headerStyle="label" />
                        <TableHeaderActions CDPipelineStages={stages} />
                    </div>
                    <ResourceActionListContextProvider>
                        {stages &&
                            stages.map((el, idx) => {
                                const key = `stage-${idx}`;

                                return (
                                    <React.Fragment key={key}>
                                        <CDPipelineStageContextProvider stage={el}>
                                            <CDPipelineStage
                                                expandedPanel={expandedPanel}
                                                handleAccordionChange={handleAccordionChange}
                                            />
                                        </CDPipelineStageContextProvider>
                                    </React.Fragment>
                                );
                            })}
                        <CDPipelineStageActions />
                    </ResourceActionListContextProvider>
                </>
            </Render>
        </>
    );
};
