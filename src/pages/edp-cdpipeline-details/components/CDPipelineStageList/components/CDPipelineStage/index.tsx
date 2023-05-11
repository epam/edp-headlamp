import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { PIPELINE_RUN_STATUSES } from '../../../../../../constants/statuses';
import { streamApplicationListByPipelineStageLabel } from '../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../k8s/Application/types';
import {
    streamAutotestRunnerPipelineRunList,
    streamAutotestsPipelineRunList,
    streamPipelineRunListByTypeAndPipelineNameLabels,
} from '../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';
import { useStorageSizeQuery } from '../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { createRandomFiveSymbolString } from '../../../../../../utils/createRandomFiveSymbolString';
import { parsePipelineRunStatus } from '../../../../../../utils/parsePipelineRunStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { ApplicationsContext, CDPipelineDataContext } from '../../../../index';
import { CurrentCDPipelineStageDataContext } from '../../index';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns as useDeployPipelineRunsColumns } from './components/DeployPipelineRunsTable/hooks/useColumns';
import { PipelineRunTrigger } from './components/PipelineRunTrigger';
import { useCreateAutotestRunnerPipelineRun } from './components/PipelineRunTrigger/hooks/useCreateAutotestRunnerPipelineRun';
import { useColumns } from './hooks/useColumns';
import { useEveryArgoAppIsHealthyAndInSync } from './hooks/useEveryArgoAppIsHealthyAndInSync';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import {
    EnrichedApplicationWithArgoApplication,
    EnrichedQualityGateWithAutotestPipelineRun,
} from './types';

const { Grid, Typography, Button, CircularProgress } = MuiCore;
const randomPostfix = createRandomFiveSymbolString();

export const CDPipelineStage = (): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );
    const enrichedApplicationsWithItsImageStreams = React.useContext(ApplicationsContext);
    const CDPipelineDataContextValue = React.useContext(CDPipelineDataContext);

    const classes = useStyles();
    const generalInfoRows = useRows(CurrentCDPipelineStageDataContextValue);
    const qualityGatesColumns = useColumns(
        CurrentCDPipelineStageDataContextValue.metadata.namespace
    );
    const deployPipelineRunsColumns = useDeployPipelineRunsColumns();

    const [, setError] = React.useState<Error>(null);
    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    const [argoApplications, setArgoApplications] = React.useState<
        ApplicationKubeObjectInterface[]
    >([]);
    const handleStoreArgoApplications = React.useCallback(
        (argoApplications: ApplicationKubeObjectInterface[]) => {
            setArgoApplications(argoApplications);
        },
        []
    );

    const [latestTenDeployPipelineRuns, setLatestTenDeployPipelineRuns] = React.useState<
        PipelineRunKubeObjectInterface[]
    >([]);
    const handleStoreLatestTenDeployPipelineRuns = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const latestTenDeployPipelineRuns = data
                .sort(sortKubeObjectByCreationTimestamp)
                .slice(0, 10);
            setLatestTenDeployPipelineRuns(latestTenDeployPipelineRuns);
        },
        [setLatestTenDeployPipelineRuns]
    );

    const [latestTenAutotestPipelineRuns, setLatestTenAutotestPipelineRuns] = React.useState<
        PipelineRunKubeObjectInterface[]
    >([]);
    const handleStoreLatestTenAutotestPipelineRuns = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const latestTenAutotestPipelineRuns = data
                .sort(sortKubeObjectByCreationTimestamp)
                .slice(0, 10);
            setLatestTenAutotestPipelineRuns(latestTenAutotestPipelineRuns);
        },
        [setLatestTenAutotestPipelineRuns]
    );

    const [latestTenAutotestRunnersPipelineRun, setLatestTenAutotestRunnersPipelineRun] =
        React.useState<PipelineRunKubeObjectInterface[]>([]);
    const handleStoreLatestTenAutotestRunnerPipelineRuns = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const latestTenAutotestRunnersPipelineRun = data
                .sort(sortKubeObjectByCreationTimestamp)
                .slice(0, 10);
            setLatestTenAutotestRunnersPipelineRun(latestTenAutotestRunnersPipelineRun);
        },
        [setLatestTenAutotestRunnersPipelineRun]
    );

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

    React.useEffect(() => {
        const cancelApplicationsStream = streamApplicationListByPipelineStageLabel(
            CDPipelineDataContextValue.metadata.name,
            CurrentCDPipelineStageDataContextValue.spec.name,
            handleStoreArgoApplications,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        const cancelDeployPipelineRunsStream = streamPipelineRunListByTypeAndPipelineNameLabels(
            PIPELINE_TYPES.DEPLOY,
            CurrentCDPipelineStageDataContextValue.metadata.name,
            handleStoreLatestTenDeployPipelineRuns,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        const cancelAutotestRunnerPipelineRunsStream = streamAutotestRunnerPipelineRunList(
            CurrentCDPipelineStageDataContextValue.spec.name,
            CDPipelineDataContextValue.metadata.name,
            handleStoreLatestTenAutotestRunnerPipelineRuns,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        const cancelAutotestPipelineRunsStream = streamAutotestsPipelineRunList(
            CurrentCDPipelineStageDataContextValue.spec.name,
            CDPipelineDataContextValue.metadata.name,
            handleStoreLatestTenAutotestPipelineRuns,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        return () => {
            cancelDeployPipelineRunsStream();
            cancelAutotestPipelineRunsStream();
            cancelAutotestRunnerPipelineRunsStream();
            cancelApplicationsStream();
        };
    }, [
        CDPipelineDataContextValue,
        CurrentCDPipelineStageDataContextValue,
        handleError,
        handleStoreArgoApplications,
        handleStoreLatestTenAutotestPipelineRuns,
        handleStoreLatestTenDeployPipelineRuns,
        handleStoreLatestTenAutotestRunnerPipelineRuns,
    ]);

    const thereAreArgoApplications = React.useMemo(
        () => argoApplications.length,
        [argoApplications.length]
    );

    const latestDeployPipelineRunIsRunning = React.useMemo(
        () =>
            parsePipelineRunStatus(latestTenDeployPipelineRuns[0]) ===
            PIPELINE_RUN_STATUSES.RUNNING,
        [latestTenDeployPipelineRuns]
    );

    const latestAutotestPipelineRunIsRunning = React.useMemo(
        () =>
            parsePipelineRunStatus(latestTenAutotestPipelineRuns[0]) ===
            PIPELINE_RUN_STATUSES.RUNNING,
        [latestTenAutotestPipelineRuns]
    );

    const latestAutotestRunnerIsRunning = React.useMemo(
        () =>
            parsePipelineRunStatus(latestTenAutotestRunnersPipelineRun[0]) ===
            PIPELINE_RUN_STATUSES.RUNNING,
        [latestTenAutotestRunnersPipelineRun]
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
            namespace: CurrentCDPipelineStageDataContextValue.metadata.namespace,
            storageSize: storageSize,
            randomPostfix,
            stageName: CurrentCDPipelineStageDataContextValue.spec.name,
            CDPipelineName: CDPipelineDataContextValue.metadata.name,
        });
    }, [
        CDPipelineDataContextValue.metadata.name,
        CurrentCDPipelineStageDataContextValue.metadata.namespace,
        CurrentCDPipelineStageDataContextValue.spec.name,
        createAutotestRunnerPipelineRun,
        storageSize,
    ]);

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
