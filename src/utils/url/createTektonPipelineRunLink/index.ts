import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createTektonPipelineRunLink = (
    tektonURLOrigin: string,
    namespace: string,
    pipelineRunName: string
) => {
    if (!tektonURLOrigin) {
        return;
    }

    const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
    const tektonPipelineRunURLObject = new URL(
        `/#/namespaces/${namespace}/pipelineruns/${pipelineRunName}`,
        tektonURLObject
    );

    return tektonPipelineRunURLObject.href;
};
