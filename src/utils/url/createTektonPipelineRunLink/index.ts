import { EDPComponentsURLS } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createTektonPipelineRunLink = (
    EDPComponentsURLS: EDPComponentsURLS,
    namespace: string,
    pipelineRunName: string
) => {
    const tektonURLOrigin = EDPComponentsURLS?.tekton;

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
