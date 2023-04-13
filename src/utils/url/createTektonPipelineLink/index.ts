import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createTektonPipelineLink = (
    tektonURLOrigin: string,
    namespace: string,
    pipelineName: string
) => {
    if (!tektonURLOrigin) {
        return;
    }

    const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
    const tektonPipelineURLObject = new URL(
        `/#/namespaces/${namespace}/pipelines/${pipelineName}`,
        tektonURLObject
    );

    return tektonPipelineURLObject.href;
};
