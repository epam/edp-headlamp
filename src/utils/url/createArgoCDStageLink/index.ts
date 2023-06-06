import { EDPComponentsURLS } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createArgoCDStageLink = (
    EDPComponentsURLS: EDPComponentsURLS,
    pipelineName: string,
    stageName: string
) => {
    const argoCDURLOrigin = EDPComponentsURLS?.argocd;

    if (!argoCDURLOrigin) {
        return;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
        'labels',
        `app.edp.epam.com/pipeline=${pipelineName},app.edp.epam.com/stage=${stageName}`
    );

    return argoCDApplicationsURLObject.href;
};
