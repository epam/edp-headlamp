import { createURLObjectFromURLOrigin } from '../index';

export const TektonURLService = {
    createPipelineLink: (tektonURLOrigin: string, namespace: string, pipelineName: string) => {
        if (!tektonURLOrigin) {
            return undefined;
        }

        const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
        const tektonPipelineURLObject = new URL(
            `/#/namespaces/${namespace}/pipelines/${pipelineName}`,
            tektonURLObject
        );

        return tektonPipelineURLObject.href;
    },
    createPipelineRunLink: (
        tektonURLOrigin: string,
        namespace: string,
        pipelineRunName: string,
        taskRunName?: string,
        taskRunStepName?: string
    ) => {
        if (!tektonURLOrigin) {
            return undefined;
        }

        const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
        const tektonPipelineRunURLObject = new URL(
            `/#/namespaces/${namespace}/pipelineruns/${pipelineRunName}`,
            tektonURLObject
        );

        if (!taskRunName && !taskRunStepName) {
            return tektonPipelineRunURLObject.href;
        }

        if (taskRunName && !taskRunStepName) {
            return `${tektonPipelineRunURLObject.href}?pipelineTask=${taskRunName}`;
        }

        if (taskRunName && taskRunStepName) {
            return `${tektonPipelineRunURLObject.href}?pipelineTask=${taskRunName}&step=${taskRunStepName}`;
        }
    },
    createTaskRunLink: (tektonURLOrigin: string, namespace: string, taskRunName: string) => {
        if (!tektonURLOrigin) {
            return undefined;
        }

        const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
        const tektonPipelineRunURLObject = new URL(
            `/#/namespaces/${namespace}/taskruns/${taskRunName}`,
            tektonURLObject
        );

        return tektonPipelineRunURLObject.href;
    },
};
