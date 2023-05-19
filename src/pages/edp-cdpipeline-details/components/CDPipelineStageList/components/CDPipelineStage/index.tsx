import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { TEKTON_RESOURCE_STATUSES } from '../../../../../../constants/statuses';
import { useStreamApplicationListByPipelineStageLabel } from '../../../../../../k8s/Application/hooks/useStreamApplicationListByPipelineStageLabel';
import { useStreamAutotestPipelineRunList } from '../../../../../../k8s/PipelineRun/hooks/useStreamAutotestPipelineRunList';
import { useStreamAutotestRunnerPipelineRunList } from '../../../../../../k8s/PipelineRun/hooks/useStreamAutotestRunnerPipelineRunList';
import { useStreamPipelineRunListByTypeAndPipelineNameLabels } from '../../../../../../k8s/PipelineRun/hooks/useStreamPipelineRunListByTypeAndPipelineNameLabels';
import { useStreamTaskRunListByPipelineNameAndPipelineType } from '../../../../../../k8s/TaskRun/hooks/useStreamTaskRunListByPipelineNameAndPipelineType';
import { useStorageSizeQuery } from '../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { createRandomFiveSymbolString } from '../../../../../../utils/createRandomFiveSymbolString';
import { parseTektonResourceStatus } from '../../../../../../utils/parseTektonResourceStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { ApplicationsContext, CDPipelineDataContext } from '../../../../index';
import { CurrentCDPipelineStageDataContext } from '../../index';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns as useDeployPipelineRunsColumns } from './components/DeployPipelineRunsTable/hooks/useColumns';
import { PipelineRunTrigger } from './components/PipelineRunTrigger';
import { useCreateAutotestRunnerPipelineRun } from './components/PipelineRunTrigger/hooks/useCreateAutotestRunnerPipelineRun';
import { QualityGatesDiagram } from './components/QualityGatesDiagram';
import { useColumns } from './hooks/useColumns';
import { useEveryArgoAppIsHealthyAndInSync } from './hooks/useEveryArgoAppIsHealthyAndInSync';
import { useQualityGatesGraphData } from './hooks/useQualityGatesGraphData';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import {
    EnrichedApplicationWithArgoApplication,
    EnrichedQualityGateWithAutotestPipelineRun,
} from './types';

const { Grid, Typography, Button, CircularProgress } = MuiCore;
const randomPostfix = createRandomFiveSymbolString();

export const CDPipelineStage = (): React.ReactElement => {
    const CDPipelineDataContextValue = React.useContext(CDPipelineDataContext);
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );
    const enrichedApplicationsWithItsImageStreams = React.useContext(ApplicationsContext);

    const namespace = CurrentCDPipelineStageDataContextValue.metadata.namespace;
    const stageSpecName = CurrentCDPipelineStageDataContextValue.spec.name;
    const stageMetadataName = CurrentCDPipelineStageDataContextValue.metadata.name;
    const CDPipelineName = CDPipelineDataContextValue.metadata.name;

    const classes = useStyles();
    const generalInfoRows = useRows(CurrentCDPipelineStageDataContextValue);
    const qualityGatesColumns = useColumns(
        CurrentCDPipelineStageDataContextValue.metadata.namespace
    );
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

    const enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[] =
        React.useMemo(
            () =>
                enrichedApplicationsWithItsImageStreams &&
                enrichedApplicationsWithItsImageStreams.length &&
                enrichedApplicationsWithItsImageStreams.map(
                    enrichedApplicationWithItsImageStreams => {
                        const fitArgoApplication = argoApplications.find(
                            argoApplication =>
                                argoApplication.metadata.labels['app.edp.epam.com/app-name'] ===
                                enrichedApplicationWithItsImageStreams.application.metadata.name
                        );

                        return {
                            enrichedApplicationWithItsImageStreams,
                            argoApplication: fitArgoApplication,
                        };
                    }
                ),
            [enrichedApplicationsWithItsImageStreams, argoApplications]
        );

    const enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[] =
        React.useMemo(
            () =>
                CurrentCDPipelineStageDataContextValue.spec.qualityGates.map(qualityGate => {
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
            [
                CurrentCDPipelineStageDataContextValue.spec.qualityGates,
                latestTenAutotestPipelineRuns,
            ]
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
        () => CurrentCDPipelineStageDataContextValue.spec.qualityGates.find(el => el.autotestName),
        [CurrentCDPipelineStageDataContextValue.spec.qualityGates]
    );

    const everyArgoAppIsHealthyAndInSync = useEveryArgoAppIsHealthyAndInSync(
        enrichedApplicationsWithArgoApplications
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

    const { data: storageSize } = useStorageSizeQuery(
        enrichedApplicationsWithItsImageStreams?.[0]?.application
    );

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

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <div className={classes.tableItemTitle}>
                    <Typography variant={'h5'}>Applications</Typography>
                </div>
                <CDPipelineStageApplicationsTable
                    enrichedApplicationsWithArgoApplications={
                        enrichedApplicationsWithArgoApplications
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
                                    <Typography variant={'h5'}>Quality gates</Typography>
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
                                            <Typography variant={'h5'}>Custom gates</Typography>
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <PipelineRunTrigger
                                                    namespace={
                                                        CurrentCDPipelineStageDataContextValue
                                                            .metadata.namespace
                                                    }
                                                    runActionIsEnabled={
                                                        deployPipelineRunActionEnabled
                                                    }
                                                    enrichedApplicationsWithArgoApplications={
                                                        enrichedApplicationsWithArgoApplications
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <HeadlampSimpleTable
                                                    columns={deployPipelineRunsColumns}
                                                    rowsPerPage={[10]}
                                                    data={latestTenDeployPipelineRuns}
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
    );
};
