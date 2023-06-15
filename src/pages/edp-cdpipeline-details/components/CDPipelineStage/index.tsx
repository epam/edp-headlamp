import clsx from 'clsx';
import { DocLink } from '../../../../components/DocLink';
import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { Render } from '../../../../components/Render';
import { ResourceIconLink } from '../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../constants/icons';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { CUSTOM_RESOURCE_STATUSES, TEKTON_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { TRIGGER_TYPES } from '../../../../constants/triggerTypes';
import {
    URL_EDP_HEADLAMP_USER_GUIDE_QUALITY_GATE_ADD,
    URL_EDP_HEADLAMP_USER_GUIDE_QUALITY_GATE_RUN,
} from '../../../../constants/urls';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useStreamAutotestPipelineRunList } from '../../../../k8s/PipelineRun/hooks/useStreamAutotestPipelineRunList';
import { useStreamAutotestRunnerPipelineRunList } from '../../../../k8s/PipelineRun/hooks/useStreamAutotestRunnerPipelineRunList';
import { useStreamPipelineRunListByTypeAndPipelineNameLabels } from '../../../../k8s/PipelineRun/hooks/useStreamPipelineRunListByTypeAndPipelineNameLabels';
import { useStreamTaskRunListByPipelineNameAndPipelineType } from '../../../../k8s/TaskRun/hooks/useStreamTaskRunListByPipelineNameAndPipelineType';
import { useStorageSizeQuery } from '../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { parseTektonResourceStatus } from '../../../../utils/parseTektonResourceStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { createArgoCDStageLink } from '../../../../utils/url/createArgoCDStageLink';
import { createGrafanaLink } from '../../../../utils/url/createGrafanaLink';
import { createKibanaLink } from '../../../../utils/url/createKibanaLink';
import { useCDPipelineContext } from '../../providers/CDPipeline/hooks';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns as useDeployPipelineRunsColumns } from './components/DeployPipelineRunsTable/hooks/useColumns';
import { PipelineRunTrigger } from './components/PipelineRunTrigger';
import { useCreateAutotestRunnerPipelineRun } from './components/PipelineRunTrigger/hooks/useCreateAutotestRunnerPipelineRun';
import { QualityGatesDiagram } from './components/QualityGatesDiagram';
import { useColumns } from './hooks/useColumns';
import { useEnrichedApplicationsWithArgoApplications } from './hooks/useEnrichedApplicationsWithArgoApplication';
import { useEveryArgoAppIsHealthyAndInSync } from './hooks/useEveryArgoAppIsHealthyAndInSync';
import { useQualityGatesGraphData } from './hooks/useQualityGatesGraphData';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CDPipelineStageProps, EnrichedQualityGateWithAutotestPipelineRun } from './types';

const { Icon } = Iconify;
const {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Grid,
    Button,
    CircularProgress,
    IconButton,
    Tooltip,
} = MuiCore;
const randomPostfix = createRandomFiveSymbolString();

export const CDPipelineStage = ({ expandedPanel, handleAccordionChange }: CDPipelineStageProps) => {
    const { CDPipeline } = useCDPipelineContext();
    const { stage } = useCDPipelineStageContext();
    const { enrichedApplications } = useEnrichedApplicationsContext();

    const namespace = stage.metadata.namespace;
    const stageSpecName = stage.spec.name;
    const stageMetadataName = stage.metadata.name;
    const CDPipelineName = CDPipeline.metadata.name;

    const classes = useStyles();
    const generalInfoRows = useRows(stage);
    const qualityGatesColumns = useColumns(namespace);
    const deployPipelineRunsColumns = useDeployPipelineRunsColumns();

    const argoApplications = useStreamApplicationListByPipelineStageLabel({
        namespace,
        stageSpecName,
        CDPipelineMetadataName: CDPipelineName,
    });

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

    const taskRunList = useStreamTaskRunListByPipelineNameAndPipelineType({
        namespace,
        CDPipelineName,
        pipelineType: PIPELINE_TYPES.AUTOTEST_RUNNER,
        parentPipelineRunName: latestAutotestRunnerPipelineRunName,
        select: React.useCallback(data => {
            return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
        }, []),
    });

    const enrichedApplicationsWithArgoApplications = useEnrichedApplicationsWithArgoApplications({
        enrichedApplicationsWithItsImageStreams: enrichedApplications,
        argoApplications,
    });

    const memoizedEnrichedApplicationsWithArgoApplications = React.useMemo(
        () => enrichedApplicationsWithArgoApplications,
        [enrichedApplicationsWithArgoApplications]
    );

    const enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[] =
        React.useMemo(
            () =>
                stage.spec.qualityGates.map(qualityGate => {
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
            [stage.spec.qualityGates, latestTenAutotestPipelineRuns]
        );

    const thereAreArgoApplications = React.useMemo(
        () => argoApplications.length,
        [argoApplications.length]
    );

    const latestDeployPipelineRunIsRunning = React.useMemo(
        () =>
            parseTektonResourceStatus(latestTenDeployPipelineRuns[0]) ===
            TEKTON_RESOURCE_STATUSES.PENDING,
        [latestTenDeployPipelineRuns]
    );

    const latestAutotestPipelineRunIsRunning = React.useMemo(
        () =>
            parseTektonResourceStatus(latestTenAutotestPipelineRuns[0]) ===
            TEKTON_RESOURCE_STATUSES.RUNNING,
        [latestTenAutotestPipelineRuns]
    );

    const latestAutotestRunnerIsRunning = React.useMemo(
        () =>
            parseTektonResourceStatus(latestAutotestRunnerPipelineRuns?.[0]) ===
            TEKTON_RESOURCE_STATUSES.RUNNING,
        [latestAutotestRunnerPipelineRuns]
    );

    const hasAutotests = React.useMemo(
        () => stage.spec.qualityGates.find(el => el.autotestName),
        [stage.spec.qualityGates]
    );

    const everyArgoAppIsHealthyAndInSync = useEveryArgoAppIsHealthyAndInSync(
        memoizedEnrichedApplicationsWithArgoApplications
    );

    const deployPipelineRunActionEnabled = React.useMemo(() => {
        if (!thereAreArgoApplications || latestDeployPipelineRunIsRunning) {
            return false;
        }

        return everyArgoAppIsHealthyAndInSync;
    }, [
        everyArgoAppIsHealthyAndInSync,
        latestDeployPipelineRunIsRunning,
        thereAreArgoApplications,
    ]);

    const autotestRunnerPipelineRunActionEnabled = React.useMemo(() => {
        if (
            !thereAreArgoApplications ||
            latestAutotestPipelineRunIsRunning ||
            latestAutotestRunnerIsRunning
        ) {
            return false;
        }

        return everyArgoAppIsHealthyAndInSync;
    }, [
        latestAutotestRunnerIsRunning,
        everyArgoAppIsHealthyAndInSync,
        latestAutotestPipelineRunIsRunning,
        thereAreArgoApplications,
    ]);

    const { createAutotestRunnerPipelineRun } = useCreateAutotestRunnerPipelineRun({});

    const { data: storageSize } = useStorageSizeQuery(enrichedApplications?.[0]?.application);

    const handleRunAutotestRunner = React.useCallback(async () => {
        if (!storageSize) {
            throw new Error(`Trigger template's storage property has not been found`);
        }

        await createAutotestRunnerPipelineRun({
            namespace,
            storageSize,
            randomPostfix,
            stageSpecName,
            CDPipelineName,
        });
    }, [CDPipelineName, createAutotestRunnerPipelineRun, namespace, stageSpecName, storageSize]);

    const { nodes, edges } = useQualityGatesGraphData(
        taskRunList,
        enrichedQualityGatesWithPipelineRuns
    );

    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const accordionItemName = stage.spec.name;
    const status = React.useMemo(
        () => (stage.status ? stage.status.status : CUSTOM_RESOURCE_STATUSES.UNKNOWN),
        [stage.status]
    );

    const argoCDStageLink = React.useMemo(
        () => createArgoCDStageLink(EDPComponentsURLS, CDPipeline?.metadata?.name, stage.spec.name),
        [CDPipeline?.metadata?.name, EDPComponentsURLS, stage.spec.name]
    );

    const grafanaLink = React.useMemo(
        () => createGrafanaLink(EDPComponentsURLS, stage.spec.namespace),
        [EDPComponentsURLS, stage.spec.namespace]
    );
    const kibanaLink = React.useMemo(
        () => createKibanaLink(EDPComponentsURLS, stage.spec.namespace),
        [EDPComponentsURLS, stage.spec.namespace]
    );

    const statusTitle = React.useMemo(
        () => (
            <>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                    {capitalizeFirstLetter(status)}
                </Typography>
                <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                    <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                        {stage?.status?.detailed_message}
                    </Typography>
                </Render>
            </>
        ),
        [stage?.status?.detailed_message, status]
    );

    const { handleOpenResourceActionListMenu } = useResourceActionListContext();
    const buttonRef = React.createRef<HTMLButtonElement>();

    const isManualTriggerType = React.useMemo(
        () => stage?.spec.triggerType === TRIGGER_TYPES.MANUAL,
        [stage?.spec.triggerType]
    );

    return (
        <>
            <div style={{ paddingBottom: rem(16) }}>
                <Accordion
                    expanded={expandedPanel === accordionItemName}
                    onChange={handleAccordionChange(accordionItemName)}
                >
                    <AccordionSummary
                        expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}
                        className={classes.accordionSummary}
                    >
                        <div className={classes.stageHeading}>
                            <StatusIcon status={status} customTitle={statusTitle} />
                            <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                                {stage.spec.name}
                            </Typography>
                            <Render condition={isManualTriggerType}>
                                <Chip
                                    label="manual"
                                    className={clsx([classes.labelChip, classes.labelChipBlue])}
                                />
                            </Render>
                            <Render condition={!isManualTriggerType}>
                                <Chip
                                    label="auto"
                                    className={clsx([classes.labelChip, classes.labelChipGreen])}
                                />
                            </Render>
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
                                        <Tooltip title={'Actions'}>
                                            <IconButton
                                                aria-label={'Actions'}
                                                ref={buttonRef}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleOpenResourceActionListMenu(
                                                        buttonRef.current,
                                                        stage
                                                    );
                                                }}
                                            >
                                                <Icon
                                                    icon={ICONS.THREE_DOTS}
                                                    color={'grey'}
                                                    width="20"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <div className={classes.tableItemTitle}>
                                    <Typography variant={'h5'}>Applications</Typography>
                                </div>
                                <CDPipelineStageApplicationsTable
                                    enrichedApplicationsWithArgoApplications={
                                        memoizedEnrichedApplicationsWithArgoApplications
                                    }
                                    qualityGatePipelineIsRunning={latestDeployPipelineRunIsRunning}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={8}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <div className={classes.tableItemTitle}>
                                                    <Grid
                                                        container
                                                        alignItems={'center'}
                                                        spacing={1}
                                                    >
                                                        <Grid item>
                                                            <Typography variant={'h5'}>
                                                                Quality gates
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <DocLink
                                                                title={'Quality Gate Run Doc'}
                                                                href={
                                                                    URL_EDP_HEADLAMP_USER_GUIDE_QUALITY_GATE_RUN
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <HeadlampSimpleTable
                                                    columns={qualityGatesColumns}
                                                    rowsPerPage={[15, 25, 50]}
                                                    data={enrichedQualityGatesWithPipelineRuns}
                                                />
                                                <QualityGatesDiagram nodes={nodes} edges={edges} />
                                                <Grid container justifyContent={'flex-end'}>
                                                    <Grid item>
                                                        <Button
                                                            component={'button'}
                                                            type={'button'}
                                                            variant={'contained'}
                                                            color={'primary'}
                                                            size={'small'}
                                                            disabled={
                                                                !autotestRunnerPipelineRunActionEnabled ||
                                                                !hasAutotests
                                                            }
                                                            onClick={handleRunAutotestRunner}
                                                        >
                                                            {latestAutotestRunnerIsRunning ? (
                                                                <CircularProgress
                                                                    style={{
                                                                        width: rem(18),
                                                                        height: rem(18),
                                                                        marginRight: rem(5),
                                                                    }}
                                                                />
                                                            ) : null}
                                                            Promote
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: rem(100) }}>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12}>
                                                        <div className={classes.tableItemTitle}>
                                                            <Grid
                                                                container
                                                                alignItems={'center'}
                                                                spacing={1}
                                                            >
                                                                <Grid item>
                                                                    <Typography variant={'h5'}>
                                                                        Custom gates
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <DocLink
                                                                        title={
                                                                            'Quality Gate Creation Doc'
                                                                        }
                                                                        href={
                                                                            URL_EDP_HEADLAMP_USER_GUIDE_QUALITY_GATE_ADD
                                                                        }
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <PipelineRunTrigger
                                                                    namespace={namespace}
                                                                    runActionIsEnabled={
                                                                        deployPipelineRunActionEnabled
                                                                    }
                                                                    enrichedApplicationsWithArgoApplications={
                                                                        memoizedEnrichedApplicationsWithArgoApplications
                                                                    }
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <HeadlampSimpleTable
                                                                    columns={
                                                                        deployPipelineRunsColumns
                                                                    }
                                                                    rowsPerPage={[10]}
                                                                    data={
                                                                        latestTenDeployPipelineRuns
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <div className={classes.tableItemTitle}>
                                            <Typography variant={'h5'}>General info</Typography>
                                        </div>
                                        <HeadlampNameValueTable rows={generalInfoRows} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};
