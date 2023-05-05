import { HeadlampNameValueTable } from '../../../../../../components/HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import {
    ARGO_APPLICATION_HEALTH_STATUSES,
    ARGO_APPLICATION_SYNC_STATUSES,
    PIPELINE_RUN_STATUSES,
} from '../../../../../../constants/statuses';
import { streamApplicationListByPipelineStageLabel } from '../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../k8s/Application/types';
import { streamPipelineRunListByTypeLabel } from '../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { parsePipelineRunStatus } from '../../../../../../utils/parsePipelineRunStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { ApplicationsContext, CDPipelineDataContext } from '../../../../index';
import { CurrentCDPipelineStageDataContext } from '../../index';
import { CDPipelineStageApplicationsTable } from './components/CDPipelineStageApplicationsTable';
import { useColumns as useDeployPipelineRunsColumns } from './components/DeployPipelineRunsTable/hooks/useColumns';
import { PipelineRunTrigger } from './components/PipelineRunTrigger';
import { useColumns } from './hooks/useColumns';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';

const { Grid, Typography, Button } = MuiCore;

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

    const [latestTenPipelineRuns, setLatestTenPipelineRuns] = React.useState<
        PipelineRunKubeObjectInterface[]
    >([]);

    const qualityGatePipelineIsRunning = React.useMemo(
        () => parsePipelineRunStatus(latestTenPipelineRuns[0]) === PIPELINE_RUN_STATUSES['RUNNING'],
        [latestTenPipelineRuns]
    );

    const handleStoreLatestTenPipelineRuns = React.useCallback(
        (data: PipelineRunKubeObjectInterface[]) => {
            const latestTenPipelineRuns = data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
            setLatestTenPipelineRuns(latestTenPipelineRuns);
        },
        [setLatestTenPipelineRuns]
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

        const cancelPipelineRunsStream = streamPipelineRunListByTypeLabel(
            PIPELINE_TYPES['DEPLOY'],
            `${CDPipelineDataContextValue.metadata.name}-${CurrentCDPipelineStageDataContextValue.spec.name}`,
            handleStoreLatestTenPipelineRuns,
            handleError,
            CDPipelineDataContextValue.metadata.namespace
        );

        return () => {
            cancelPipelineRunsStream();
            cancelApplicationsStream();
        };
    }, [
        CDPipelineDataContextValue,
        CurrentCDPipelineStageDataContextValue,
        handleError,
        handleStoreArgoApplications,
        handleStoreLatestTenPipelineRuns,
    ]);

    const runActionIsEnabled = React.useMemo(() => {
        if (!argoApplications.length) {
            return false;
        }

        if (latestTenPipelineRuns.length) {
            if (
                latestTenPipelineRuns?.[0]?.status?.conditions?.[0]?.reason?.toLowerCase() ===
                PIPELINE_RUN_STATUSES['RUNNING']
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
    }, [argoApplications, enrichedApplicationsWithArgoApplications, latestTenPipelineRuns]);

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
                                    data={CurrentCDPipelineStageDataContextValue.spec.qualityGates}
                                />
                                <Grid container justifyContent={'flex-end'}>
                                    <Grid item>
                                        <Button
                                            component={'button'}
                                            type={'button'}
                                            variant={'contained'}
                                            color={'primary'}
                                            size={'small'}
                                            disabled={!runActionIsEnabled}
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
                                                    runActionIsEnabled={runActionIsEnabled}
                                                    enrichedApplicationsWithArgoApplications={
                                                        enrichedApplicationsWithArgoApplications
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <HeadlampSimpleTable
                                                    columns={deployPipelineRunsColumns}
                                                    rowsPerPage={[10]}
                                                    data={latestTenPipelineRuns}
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
