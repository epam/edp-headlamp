import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Graph } from '../../../../components/Graph';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { TEKTON_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useStreamTaskRunListByPipelineNameAndPipelineType } from '../../../../k8s/TaskRun/hooks/useStreamTaskRunListByPipelineNameAndPipelineType';
import { useStorageSizeQuery } from '../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { createRandomString } from '../../../../utils/createRandomString';
import { parseTektonResourceStatus } from '../../../../utils/parseTektonResourceStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { EDPStageDetailsRouteParams } from '../../types';
import { useCreateAutotestRunnerPipelineRun } from '../CustomGates/hooks/useCreateAutotestRunnerPipelineRun';
import { useColumns } from './hooks/useColumns';
import { useQualityGatesGraphData } from './hooks/useQualityGatesGraphData';
import { QualityGatesProps } from './types';

const randomPostfix = createRandomString();

export const QualityGates = ({
    enrichedQualityGatesWithPipelineRuns,
    argoApplications,
    latestAutotestRunnerPipelineRuns,
    latestTenAutotestPipelineRuns,
    everyArgoAppIsHealthyAndInSync,
}: QualityGatesProps) => {
    const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
    const columns = useColumns();

    const { enrichedApplications } = useEnrichedApplicationsContext();
    const { stage } = useCDPipelineStageContext();
    const stageSpecName = stage?.spec.name;

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

    const hasAutotests = React.useMemo(
        () => stage?.spec.qualityGates.find(el => el.autotestName),
        [stage?.spec.qualityGates]
    );

    const latestAutotestRunnerPipelineRunName = React.useMemo(
        () => latestAutotestRunnerPipelineRuns?.[0]?.metadata.name,
        [latestAutotestRunnerPipelineRuns]
    );

    const taskRunList = useStreamTaskRunListByPipelineNameAndPipelineType({
        namespace,
        CDPipelineName,
        pipelineType: PIPELINE_TYPES.AUTOTEST_RUNNER,
        parentPipelineRunName: latestAutotestRunnerPipelineRunName,
        select: React.useCallback(data => {
            return data.sort(sortKubeObjectByCreationTimestamp).slice(0, 10);
        }, []),
    });

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

    const thereAreArgoApplications = React.useMemo(
        () => argoApplications.length,
        [argoApplications.length]
    );

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

    const { nodes, edges } = useQualityGatesGraphData(
        taskRunList,
        enrichedQualityGatesWithPipelineRuns
    );

    return (
        <Grid container spacing={2} justifyContent={'flex-end'}>
            <Grid item xs={12}>
                <HeadlampSimpleTable
                    columns={columns}
                    rowsPerPage={[15, 25, 50]}
                    data={enrichedQualityGatesWithPipelineRuns}
                />
            </Grid>
            <Grid item xs={12}>
                {!!nodes && !!nodes.length && !!edges && !!edges.length ? (
                    <div
                        style={{
                            height: rem(200),
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Graph
                            direction={'RIGHT'}
                            nodes={nodes}
                            edges={edges}
                            id={'quality-gates'}
                        />
                    </div>
                ) : (
                    <CircularProgress />
                )}
                <Grid container justifyContent={'flex-end'}>
                    <Grid item>
                        <Button
                            component={'button'}
                            type={'button'}
                            variant={'contained'}
                            color={'primary'}
                            size={'small'}
                            disabled={!autotestRunnerPipelineRunActionEnabled || !hasAutotests}
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
        </Grid>
    );
};
