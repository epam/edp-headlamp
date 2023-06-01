import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { TaskRunKubeObjectInterface } from '../../../../../k8s/TaskRun/types';
import { React } from '../../../../../plugin.globals';
import { parseTektonResourceStatus } from '../../../../../utils/parseTektonResourceStatus';
import { createTektonPipelineRunLink } from '../../../../../utils/url/createTektonPipelineRunLink';
import { EnrichedQualityGateWithAutotestPipelineRun } from '../types';

export const useQualityGatesGraphData = (
    taskRunList: TaskRunKubeObjectInterface[],
    enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[]
) => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

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
            ...enrichedQualityGatesWithPipelineRuns.map((el, idx) => {
                const tektonLink =
                    el?.autotestPipelineRun &&
                    EDPComponentsURLS &&
                    Object.hasOwn(EDPComponentsURLS, 'tekton')
                        ? createTektonPipelineRunLink(
                              EDPComponentsURLS?.tekton,
                              el?.autotestPipelineRun?.metadata?.namespace,
                              el?.autotestPipelineRun?.metadata?.name
                          )
                        : null;

                return {
                    id: `node::${idx}`,
                    status: parseTektonResourceStatus(el?.autotestPipelineRun),
                    url: tektonLink,
                    title: el.qualityGate.stepName,
                    height: 35,
                    width: 150,
                };
            }),
        ];
    }, [EDPComponentsURLS, enrichedQualityGatesWithPipelineRuns, taskRunList]);

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

        for (const [idx] of enrichedQualityGatesWithPipelineRuns.entries()) {
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
    }, [enrichedQualityGatesWithPipelineRuns, taskRunList]);

    return {
        nodes,
        edges,
    };
};
