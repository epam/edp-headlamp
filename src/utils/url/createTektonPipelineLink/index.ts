import { EDPComponentsURLS } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createTektonPipelineLink = (
    EDPComponentsURLS: EDPComponentsURLS,
    namespace: string,
    pipelineName: string
) => {
    const tektonURLOrigin = EDPComponentsURLS?.tekton;

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
