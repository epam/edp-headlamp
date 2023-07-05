import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Tabs } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Breadcrumbs,
    Button,
    Chip,
    CircularProgress,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../constants/icons';
import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { TEKTON_RESOURCE_STATUSES } from '../../constants/statuses';
import { TRIGGER_TYPES } from '../../constants/triggerTypes';
import { useStreamApplicationListByPipelineStageLabel } from '../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useStreamAutotestPipelineRunList } from '../../k8s/PipelineRun/hooks/useStreamAutotestPipelineRunList';
import { useStreamAutotestRunnerPipelineRunList } from '../../k8s/PipelineRun/hooks/useStreamAutotestRunnerPipelineRunList';
import { useStreamPipelineRunListByTypeAndPipelineNameLabels } from '../../k8s/PipelineRun/hooks/useStreamPipelineRunListByTypeAndPipelineNameLabels';
import { parseTektonResourceStatus } from '../../utils/parseTektonResourceStatus';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../utils/styling/rem';
import { createArgoCDStageLink } from '../../utils/url/createArgoCDStageLink';
import { createGrafanaLink } from '../../utils/url/createGrafanaLink';
import { createKibanaLink } from '../../utils/url/createKibanaLink';
import { routeEDPCDPipelineDetails } from '../edp-cdpipeline-details/route';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { Applications } from './components/Applications';
import { CustomGates } from './components/CustomGates';
import { GeneralInfo } from './components/GeneralInfo';
import { QualityGates } from './components/QualityGates';
import { StageActions } from './components/StageActions';
import { useEnrichedApplicationsWithArgoApplications } from './hooks/useEnrichedApplicationsWithArgoApplication';
import { useEveryArgoAppIsHealthyAndInSync } from './hooks/useEveryArgoAppIsHealthyAndInSync';
import { useCDPipelineQueryContext } from './providers/CDPipelineQuery/hooks';
import { useCDPipelineStageContext } from './providers/CDPipelineStage/hooks';
import { useEnrichedApplicationsContext } from './providers/EnrichedApplications/hooks';
import { useStyles } from './styles';
import { EnrichedQualityGateWithAutotestPipelineRun } from './types';
import { EDPStageDetailsRouteParams } from './types';

export const PageView = () => {
    const classes = useStyles();
    const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();

    const { CDPipelineQuery } = useCDPipelineQueryContext();
    const { stage } = useCDPipelineStageContext();
    const { enrichedApplications } = useEnrichedApplicationsContext();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const stageSpecName = stage?.spec.name;
    const stageMetadataName = stage?.metadata.name;

    const latestTenDeployPipelineRuns = useStreamPipelineRunListByTypeAndPipelineNameLabels({
        namespace,
        pipelineType: PIPELINE_TYPES.DEPLOY,
        stageMetadataName,
        select: React.useCallback(data => {
            return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
        }, []),
    });

    const latestAutotestRunnerPipelineRuns = useStreamAutotestRunnerPipelineRunList({
        namespace,
        stageSpecName,
        CDPipelineMetadataName: CDPipelineName,
        select: React.useCallback(data => {
            return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 1);
        }, []),
    });

    const latestAutotestRunnerPipelineRunName = React.useMemo(
        () => latestAutotestRunnerPipelineRuns?.[0]?.metadata.name,
        [latestAutotestRunnerPipelineRuns]
    );

    const latestTenAutotestPipelineRuns = useStreamAutotestPipelineRunList({
        namespace,
        stageSpecName,
        CDPipelineMetadataName: CDPipelineName,
        parentPipelineRunName: latestAutotestRunnerPipelineRunName,
        select: React.useCallback(data => {
            return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
        }, []),
    });

    const enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[] =
        React.useMemo(
            () =>
                stage?.spec.qualityGates.map(qualityGate => {
                    const autotestPipelineRun = latestTenAutotestPipelineRuns.find(
                        pipelineRun =>
                            pipelineRun.metadata.labels['app.edp.epam.com/codebase'] ===
                            qualityGate.autotestName
                    );

                    return {
                        qualityGate: qualityGate,
                        autotestPipelineRun: autotestPipelineRun,
                    };
                }),
            [stage?.spec.qualityGates, latestTenAutotestPipelineRuns]
        );

    const latestDeployPipelineRunIsRunning = React.useMemo(
        () =>
            parseTektonResourceStatus(latestTenDeployPipelineRuns[0]) ===
            TEKTON_RESOURCE_STATUSES.PENDING,
        [latestTenDeployPipelineRuns]
    );

    const argoApplications = useStreamApplicationListByPipelineStageLabel({
        namespace,
        stageSpecName,
        CDPipelineMetadataName: CDPipelineName,
    });

    const enrichedApplicationsWithArgoApplications = useEnrichedApplicationsWithArgoApplications({
        enrichedApplicationsWithItsImageStreams: enrichedApplications,
        argoApplications,
    });

    const everyArgoAppIsHealthyAndInSync = useEveryArgoAppIsHealthyAndInSync(
        enrichedApplicationsWithArgoApplications
    );

    const argoCDStageLink = React.useMemo(
        () =>
            createArgoCDStageLink(
                EDPComponentsURLS,
                CDPipelineQuery?.data?.metadata?.name,
                stageSpecName
            ),
        [CDPipelineQuery?.data?.metadata?.name, EDPComponentsURLS, stageSpecName]
    );

    const grafanaLink = React.useMemo(
        () => createGrafanaLink(EDPComponentsURLS, namespace),
        [EDPComponentsURLS, namespace]
    );
    const kibanaLink = React.useMemo(
        () => createKibanaLink(EDPComponentsURLS, namespace),
        [EDPComponentsURLS, namespace]
    );

    return !!stage ? (
        <>
            <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <Breadcrumbs>
                        <Button
                            size="small"
                            component={Link}
                            routeName={routeEDPCDPipelineList.path}
                        >
                            CD Pipelines
                        </Button>
                        <Button
                            size="small"
                            component={Link}
                            routeName={routeEDPCDPipelineDetails.path}
                            params={{
                                name: CDPipelineName,
                                namespace: namespace,
                            }}
                        >
                            {CDPipelineName}
                        </Button>
                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item>
                                <Typography
                                    color="textPrimary"
                                    variant={'subtitle2'}
                                    style={{ textTransform: 'uppercase' }}
                                >
                                    {stageSpecName}
                                </Typography>
                            </Grid>
                            <Grid item style={{ marginBottom: rem(5) }}>
                                <StatusIcon status={stage.status.status} width={15} />
                            </Grid>
                            <Grid item style={{ marginBottom: rem(3) }}>
                                <Tooltip title={'Trigger Type'}>
                                    {stage.spec.triggerType === TRIGGER_TYPES.MANUAL ? (
                                        <Chip
                                            label="manual"
                                            className={clsx([
                                                classes.labelChip,
                                                classes.labelChipBlue,
                                            ])}
                                        />
                                    ) : (
                                        <Chip
                                            label="auto"
                                            className={clsx([
                                                classes.labelChip,
                                                classes.labelChipGreen,
                                            ])}
                                        />
                                    )}
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Breadcrumbs>
                </Grid>
                <Grid item>
                    <Grid container>
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
                                tooltipTitle={stage?.spec.clusterName}
                                link={null}
                            />
                        </Grid>
                        <Grid item style={{ marginLeft: rem(20) }}>
                            <StageActions stage={stage} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Tabs
                ariaLabel={'CD Pipeline Stage Details'}
                className={classes.tabs}
                tabs={[
                    {
                        label: 'Applications',
                        component: (
                            <Applications
                                enrichedApplicationsWithArgoApplications={
                                    enrichedApplicationsWithArgoApplications
                                }
                                qualityGatePipelineIsRunning={latestDeployPipelineRunIsRunning}
                            />
                        ),
                    },
                    {
                        label: 'Quality Gates',
                        component: (
                            <QualityGates
                                enrichedQualityGatesWithPipelineRuns={
                                    enrichedQualityGatesWithPipelineRuns
                                }
                                argoApplications={argoApplications}
                                everyArgoAppIsHealthyAndInSync={everyArgoAppIsHealthyAndInSync}
                                latestAutotestRunnerPipelineRuns={latestAutotestRunnerPipelineRuns}
                                latestTenAutotestPipelineRuns={latestTenAutotestPipelineRuns}
                            />
                        ),
                    },
                    {
                        label: 'Custom Gates',
                        component: (
                            <CustomGates
                                enrichedApplicationsWithArgoApplications={
                                    enrichedApplicationsWithArgoApplications
                                }
                                argoApplications={argoApplications}
                                latestTenDeployPipelineRuns={latestTenDeployPipelineRuns}
                                everyArgoAppIsHealthyAndInSync={everyArgoAppIsHealthyAndInSync}
                            />
                        ),
                    },
                    {
                        label: 'General Info',
                        component: <GeneralInfo />,
                    },
                ]}
            />
        </>
    ) : (
        <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
    );
};
