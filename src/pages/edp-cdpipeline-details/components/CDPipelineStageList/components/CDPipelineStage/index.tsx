import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import {
    ARGO_APPLICATION_HEALTH_STATUSES,
    ARGO_APPLICATION_SYNC_STATUSES,
    PIPELINE_RUN_STATUSES,
} from '../../../../../../constants/statuses';
import { useGitServers } from '../../../../../../hooks/useGitServers';
import { useTriggerTemplates } from '../../../../../../hooks/useTriggerTemplates';
import { streamApplicationListByPipelineStageLabel } from '../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../k8s/Application/types';
import {
    streamAutotestsPipelineRunList,
    streamPipelineRunListByTypeAndPipelineNameLabels,
    streamPipelineRunListByTypeLabel,
} from '../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';
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
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';

const { Grid, Typography, Button } = MuiCore;
const randomPostfix = createRandomFiveSymbolString();

export const CDPipelineStage = (): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );
    const enrichedWithImageStreamsApplications = React.useContext(ApplicationsContext);
    const CDPipelineDataContextValue = React.useContext(CDPipelineDataContext);

    const classes = useStyles();
    const generalInfoRows = useRows(CurrentCDPipelineStageDataContextValue);
    const qualityGatesColumns = useColumns();
    const deployPipelineRunsColumns = useDeployPipelineRunsColumns();

    const [, setError] = React.useState<Error>(null);

    const [argoApplications, setArgoApplications] = React.useState<
        ApplicationKubeObjectInterface[]
    >([]);

    const enrichedApplicationsWithArgoApplications = React.useMemo(
        () =>
            enrichedWithImageStreamsApplications.map(enrichedApplication => {
                const fitArgoApplication = argoApplications.find(
                    argoApplication =>
                        argoApplication.metadata.labels['app.edp.epam.com/app-name'] ===
                        enrichedApplication.application.metadata.name
                );

                return {
                    enrichedApplication,
                    argoApplication: fitArgoApplication,
                };
            }),
        [enrichedWithImageStreamsApplications, argoApplications]
    );

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
    const [latestTenAutotestRunnerPipelineRuns, setLatestTenAutotestRunnerPipelineRuns] =
        React.useState<PipelineRunKubeObjectInterface[]>([]);
    const handleStoreLatestTenAutotestRunnerPipelineRuns = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const latestTenAutotestRunnerPipelineRuns = data
                .sort(sortKubeObjectByCreationTimestamp)
                .slice(0, 10);
            setLatestTenAutotestRunnerPipelineRuns(latestTenAutotestRunnerPipelineRuns);
        },
        [setLatestTenAutotestRunnerPipelineRuns]
    );

    const enrichedQualityGatesWithPipelineRuns = React.useMemo(
        () =>
            CurrentCDPipelineStageDataContextValue.spec.qualityGates.map(qualityGate => {
                return {
                    qualityGate: qualityGate,
                    autotestPipelineRun: latestTenAutotestPipelineRuns.find(
                        pipelineRun =>
                            pipelineRun.metadata.labels['app.edp.epam.com/codebase'] ===
                            qualityGate.autotestName
                    ),
                };
            }),
        [CurrentCDPipelineStageDataContextValue.spec.qualityGates, latestTenAutotestPipelineRuns]
    );

    const qualityGatePipelineIsRunning = React.useMemo(
        () =>
            parsePipelineRunStatus(latestTenDeployPipelineRuns[0]) ===
            PIPELINE_RUN_STATUSES['RUNNING'],
        [latestTenDeployPipelineRuns]
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

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
            `${CDPipelineDataContextValue.metadata.name}-${CurrentCDPipelineStageDataContextValue.spec.name}`,
            handleStoreLatestTenDeployPipelineRuns,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        const cancelAutotestRunnerPipelineRunsStream = streamPipelineRunListByTypeLabel(
            PIPELINE_TYPES.AUTOTEST_RUNNER,
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

    const deployPipelineRunActionEnabled = React.useMemo(() => {
        if (!argoApplications.length) {
            return false;
        }

        if (latestTenDeployPipelineRuns.length) {
            if (
                latestTenDeployPipelineRuns?.[0]?.status?.conditions?.[0]?.reason?.toLowerCase() ===
                PIPELINE_RUN_STATUSES.RUNNING
            ) {
                return false;
            }
        }

        return enrichedApplicationsWithArgoApplications.every(({ argoApplication }) => {
            if (!argoApplication?.status?.health?.status) {
                return false;
            }

            if (!argoApplication?.status?.sync?.status) {
                return false;
            }

            const healthIsOk =
                argoApplication.status.health.status.toLowerCase() ===
                ARGO_APPLICATION_HEALTH_STATUSES['HEALTHY'];
            const syncIsOk =
                argoApplication.status.sync.status.toLowerCase() ===
                ARGO_APPLICATION_SYNC_STATUSES['SYNCED'];

            return healthIsOk && syncIsOk;
        });
    }, [argoApplications, enrichedApplicationsWithArgoApplications, latestTenDeployPipelineRuns]);

    const autotestRunnerPipelineRunActionEnabled = React.useMemo(() => {
        if (!argoApplications.length) {
            return false;
        }

        if (latestTenAutotestPipelineRuns.length) {
            if (
                latestTenAutotestPipelineRuns?.[0]?.status?.conditions?.[0]?.reason?.toLowerCase() ===
                PIPELINE_RUN_STATUSES.RUNNING
            ) {
                return false;
            }
        }

        if (latestTenAutotestRunnerPipelineRuns.length) {
            if (
                latestTenAutotestRunnerPipelineRuns?.[0]?.status?.conditions?.[0]?.reason?.toLowerCase() ===
                PIPELINE_RUN_STATUSES.RUNNING
            ) {
                return false;
            }
        }

        return enrichedApplicationsWithArgoApplications.every(({ argoApplication }) => {
            if (!argoApplication?.status?.health?.status) {
                return false;
            }

            if (!argoApplication?.status?.sync?.status) {
                return false;
            }

            const healthIsOk =
                argoApplication.status.health.status.toLowerCase() ===
                ARGO_APPLICATION_HEALTH_STATUSES['HEALTHY'];
            const syncIsOk =
                argoApplication.status.sync.status.toLowerCase() ===
                ARGO_APPLICATION_SYNC_STATUSES['SYNCED'];

            return healthIsOk && syncIsOk;
        });
    }, [
        argoApplications.length,
        enrichedApplicationsWithArgoApplications,
        latestTenAutotestPipelineRuns,
        latestTenAutotestRunnerPipelineRuns,
    ]);

    const { createAutotestRunnerPipelineRun } = useCreateAutotestRunnerPipelineRun({});

    const { triggerTemplates } = useTriggerTemplates({
        namespace: CurrentCDPipelineStageDataContextValue.metadata.namespace,
    });
    const { gitServers } = useGitServers({
        namespace: CurrentCDPipelineStageDataContextValue.metadata.namespace,
    });

    const gitServerByCodebase = React.useMemo(
        () =>
            gitServers
                ? gitServers.filter(
                      el =>
                          el.metadata.name ===
                          enrichedWithImageStreamsApplications?.[0]?.application.spec.gitServer
                  )?.[0]
                : null,
        [gitServers, enrichedWithImageStreamsApplications]
    );

    const storageSize = React.useMemo(() => {
        if (!triggerTemplates?.length) {
            return;
        }

        if (!gitServerByCodebase) {
            return;
        }

        const buildTriggerTemplate = triggerTemplates.find(
            el => el.metadata.name === `${gitServerByCodebase?.spec?.gitProvider}-build-template`
        );

        return buildTriggerTemplate?.spec?.resourcetemplates?.[0]?.spec?.workspaces?.[0]
            ?.volumeClaimTemplate?.spec?.resources?.requests?.storage;
    }, [gitServerByCodebase, triggerTemplates]);

    const handleRunAutotestRunner = React.useCallback(async () => {
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
                    qualityGatePipelineIsRunning={qualityGatePipelineIsRunning}
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
                                            disabled={!autotestRunnerPipelineRunActionEnabled}
                                            onClick={handleRunAutotestRunner}
                                        >
                                            Run
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
