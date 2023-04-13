import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createArgoCDStageLink = (
    argoCDURLOrigin: string,
    pipelineName: string,
    stageName: string
) => {
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
