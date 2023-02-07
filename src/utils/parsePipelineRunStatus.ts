import { CUSTOM_RESOURCE_STATUSES, PIPELINE_RUN_STATUSES } from '../constants/statuses';
import { PipelineRunKubeObjectInterface } from '../k8s/PipelineRun/types';

export const parsePipelineRunStatus = (pipelineRun: PipelineRunKubeObjectInterface): string => {
    if (!pipelineRun?.status?.conditions?.length) {
        return CUSTOM_RESOURCE_STATUSES['UNKNOWN'];
    }

    const reasonValue = pipelineRun.status.conditions[0].reason.toLowerCase();
    const statusValue = pipelineRun.status.conditions[0].status.toLowerCase();

    if (reasonValue === PIPELINE_RUN_STATUSES['RUNNING']) {
        return reasonValue;
    }

    if (statusValue === 'true') {
        return PIPELINE_RUN_STATUSES['SUCCEEDED'];
    }

    return PIPELINE_RUN_STATUSES['FAILED'];
};
