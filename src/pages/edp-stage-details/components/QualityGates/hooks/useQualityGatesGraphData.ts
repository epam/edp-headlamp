import React from 'react';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { TaskRunKubeObjectInterface } from '../../../../../k8s/TaskRun/types';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { parseTektonResourceStatus } from '../../../../../utils/parseTektonResourceStatus';
import { EnrichedQualityGateWithAutotestPipelineRun } from '../../../types';

export const useQualityGatesGraphData = (
    taskRunList: TaskRunKubeObjectInterface[],
    enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[]
) => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
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

                return {
                    id: `node::${idx}`,
                    status: parseTektonResourceStatus(el?.autotestPipelineRun),
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

        const promoteTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'promote-images'
            );

        return [
            {
                id: 'node::prepare',
                status: parseTektonResourceStatus(initAutotestTaskRun),
                title: 'prepare',
                height: 35,
                width: 150,
                y: 0,
            },
            {
                id: 'node::promote',
                status: parseTektonResourceStatus(promoteTaskRun),
                title: 'promote',
                height: 35,
                width: 150,
                y: 0,
            },
            ...extraNodes,
        ];
    }, [extraNodes, taskRunList]);

    const edges = React.useMemo(() => {
        const initAutotestTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'init-autotest'
            );

        const promoteTaskRun =
            taskRunList &&
            taskRunList.length &&
            taskRunList.find(
                el => el.metadata.labels['tekton.dev/pipelineTask'] === 'promote-images'
            );

        const result = [];

        for (const [idx] of _enrichedQualityGatesWithPipelineRuns.entries()) {
            result.push({
                id: `edge::${idx}::prepare`,
                source: 'node::prepare',
                status: parseTektonResourceStatus(initAutotestTaskRun),
                target: `node::${idx}`,
            });
            result.push({
                id: `edge::${idx}::promote`,
                source: `node::${idx}`,
                status: parseTektonResourceStatus(promoteTaskRun),
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
