import React from 'react';
import { useParams } from 'react-router-dom';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../../../../k8s/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../../k8s/TaskRun/types';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import {
    EDPStageDetailsRouteParams,
    EnrichedQualityGateWithAutotestPipelineRun,
} from '../../../types';

export const useQualityGatesGraphData = (
    taskRunList: TaskRunKubeObjectInterface[],
    enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[]
) => {
    const { namespace } = useParams<EDPStageDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const _enrichedQualityGatesWithPipelineRuns = React.useMemo(
        () => enrichedQualityGatesWithPipelineRuns || [],
        [enrichedQualityGatesWithPipelineRuns]
    );

    const extraNodes = React.useMemo(
        () =>
            _enrichedQualityGatesWithPipelineRuns.map((el, idx) => {
                const tektonLink =
                    el?.autotestPipelineRun &&
                    GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                        EDPComponentsURLS?.tekton,
                        el?.autotestPipelineRun?.metadata?.namespace,
                        el?.autotestPipelineRun?.metadata?.name
                    );

                const status = PipelineRunKubeObject.parseStatus(el?.autotestPipelineRun);
                const reason = PipelineRunKubeObject.parseStatusReason(el?.autotestPipelineRun);

                const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(
                    status,
                    reason
                );

                return {
                    id: `node::${idx}`,
                    status: `Status: ${status}. Reason: ${reason}`,
                    icon,
                    color,
                    isRotating,
                    url: tektonLink,
                    title: el.qualityGate.stepName,
                    height: 35,
                    width: 150,
                };
            }),
        [EDPComponentsURLS, _enrichedQualityGatesWithPipelineRuns]
    );

    const nodes = React.useMemo(() => {
        const initAutotestTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'init-autotest'
            );

        const initAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(initAutotestTaskRun);
        const initAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(initAutotestTaskRun);

        const [
            initAutotestTaskRunStatusIcon,
            initAutotestTaskRunStatusColor,
            initAutotestTaskRunStatusIsRotating,
        ] = PipelineRunKubeObject.getStatusIcon(
            initAutotestTaskRunStatus,
            initAutotestTaskRunReason
        );

        const promoteTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'promote-images'
            );

        const promoteAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(promoteTaskRun);
        const promoteAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(promoteTaskRun);

        const [
            promoteAutotestTaskRunStatusIcon,
            promoteAutotestTaskRunStatusColor,
            promoteAutotestTaskRunStatusIsRotating,
        ] = PipelineRunKubeObject.getStatusIcon(
            promoteAutotestTaskRunStatus,
            promoteAutotestTaskRunReason
        );

        return [
            {
                id: 'node::prepare',
                status: `Status: ${initAutotestTaskRunStatus}. Reason: ${initAutotestTaskRunReason}`,
                icon: initAutotestTaskRunStatusIcon,
                color: initAutotestTaskRunStatusColor,
                isRotating: initAutotestTaskRunStatusIsRotating,
                url:
                    initAutotestTaskRun &&
                    GENERATE_URL_SERVICE.createTektonTaskRunLink(
                        EDPComponentsURLS?.tekton,
                        initAutotestTaskRun?.metadata?.namespace,
                        initAutotestTaskRun?.metadata?.name
                    ),
                title: 'prepare',
                height: 35,
                width: 150,
                y: 0,
            },
            {
                id: 'node::promote',
                status: `Status: ${promoteAutotestTaskRunStatus}. Reason: ${promoteAutotestTaskRunReason}`,
                icon: promoteAutotestTaskRunStatusIcon,
                color: promoteAutotestTaskRunStatusColor,
                isRotating: promoteAutotestTaskRunStatusIsRotating,
                url:
                    promoteTaskRun &&
                    GENERATE_URL_SERVICE.createTektonTaskRunLink(
                        EDPComponentsURLS?.tekton,
                        promoteTaskRun?.metadata?.namespace,
                        promoteTaskRun?.metadata?.name
                    ),
                title: 'promote',
                height: 35,
                width: 150,
                y: 0,
            },
            ...extraNodes,
        ];
    }, [EDPComponentsURLS?.tekton, extraNodes, taskRunList]);

    const edges = React.useMemo(() => {
        const initAutotestTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'init-autotest'
            );

        const initAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(initAutotestTaskRun);
        const initAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(initAutotestTaskRun);

        const [, initAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
            initAutotestTaskRunStatus,
            initAutotestTaskRunReason
        );

        const promoteTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'promote-images'
            );

        const promoteAutotestTaskRunStatus = TaskRunKubeObject.parseStatus(promoteTaskRun);
        const promoteAutotestTaskRunReason = TaskRunKubeObject.parseStatusReason(promoteTaskRun);

        const [, promoteAutotestTaskRunStatusColor] = PipelineRunKubeObject.getStatusIcon(
            promoteAutotestTaskRunStatus,
            promoteAutotestTaskRunReason
        );

        const result = [];

        for (const [idx] of _enrichedQualityGatesWithPipelineRuns.entries()) {
            result.push({
                id: `edge::${idx}::prepare`,
                source: 'node::prepare',
                color: initAutotestTaskRunStatusColor,
                target: `node::${idx}`,
            });
            result.push({
                id: `edge::${idx}::promote`,
                source: `node::${idx}`,
                color: promoteAutotestTaskRunStatusColor,
                target: 'node::promote',
            });
        }

        return result;
    }, [_enrichedQualityGatesWithPipelineRuns, taskRunList]);

    return {
        nodes,
        edges,
    };
};
