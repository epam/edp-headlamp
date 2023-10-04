import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Graph } from '../../../../components/Graph';
import { Table } from '../../../../components/Table';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { PIPELINE_RUN_REASON } from '../../../../k8s/PipelineRun/constants';
import { useCreateAutotestRunnerPipelineRun } from '../../../../k8s/PipelineRun/hooks/useCreateAutotestRunnerPipelineRun';
import { useStreamTaskRunListByPipelineNameAndPipelineType } from '../../../../k8s/TaskRun/hooks/useStreamTaskRunListByPipelineNameAndPipelineType';
import { useStorageSizeQuery } from '../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { useDataContext } from '../../providers/Data/hooks';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from '../../types';
import { useColumns } from './hooks/useColumns';
import { useQualityGatesGraphData } from './hooks/useQualityGatesGraphData';
import { QualityGatesProps } from './types';

export const QualityGates = ({
    enrichedQualityGatesWithPipelineRuns,
    argoApplications,
    latestAutotestRunnerPipelineRuns,
    latestTenAutotestPipelineRuns,
    everyArgoAppIsHealthyAndInSync,
}: QualityGatesProps) => {
    const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
    const columns = useColumns();

    const { enrichedApplications } = useDataContext();
    const { stage } = useDynamicDataContext();
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
            latestTenAutotestPipelineRuns?.[0]?.status?.conditions?.[0]?.reason ===
            PIPELINE_RUN_REASON.RUNNING,
        [latestTenAutotestPipelineRuns]
    );

    const latestAutotestRunnerIsRunning = React.useMemo(
        () =>
            latestAutotestRunnerPipelineRuns?.[0]?.status?.conditions?.[0]?.reason ===
            PIPELINE_RUN_REASON.RUNNING,
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
                <Table
                    columns={columns}
                    data={enrichedQualityGatesWithPipelineRuns}
                    isLoading={!enrichedQualityGatesWithPipelineRuns}
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
