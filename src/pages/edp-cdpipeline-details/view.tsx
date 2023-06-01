import { CDPipelineActions } from '../../components/CDPipelineActions';
import { Render } from '../../components/Render';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { ICONS } from '../../constants/icons';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { createArgoCDPipelineLink } from '../../utils/url/createArgoCDPipelineLink';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { CDPipelineStage } from './components/CDPipelineStage';
import { TableHeaderActions } from './components/TableHeaderActions';
import { StageDataProvider, useCDPipelineData, useCDPipelineStagesData } from './provider';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Grid, Button } = MuiCore;

const { useParams } = ReactRouter;
const {
    CommonComponents: { Link, SectionHeader },
} = pluginLib;

export const EDPCDPipelineDetails = () => {
    const classes = useStyles();
    const { name } = useParams();

    const { CDPipeline } = useCDPipelineData();
    const { stages } = useCDPipelineStagesData();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const argoCDPipelineLink = React.useMemo(
        () =>
            EDPComponentsURLS && Object.hasOwn(EDPComponentsURLS, 'argocd')
                ? createArgoCDPipelineLink(EDPComponentsURLS?.argocd, name)
                : null,
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
                                    <CDPipelineActions kubeObjectData={CDPipeline} isDetailsPage />
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
                    {stages &&
                        stages.map((el, idx) => {
                            const key = `stage-${idx}`;

                            return (
                                <React.Fragment key={key}>
                                    <StageDataProvider stage={el}>
                                        <CDPipelineStage
                                            expandedPanel={expandedPanel}
                                            handleAccordionChange={handleAccordionChange}
                                        />
                                    </StageDataProvider>
                                </React.Fragment>
                            );
                        })}
                </>
            </Render>
        </>
    );
};
