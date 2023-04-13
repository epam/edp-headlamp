import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createArgoCDApplicationLink = (
    argoCDURLOrigin: string,
    pipelineName: string,
    stageName: string,
    appName: string
) => {
    if (!argoCDURLOrigin) {
        return;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
        'labels',
        `app.edp.epam.com/pipeline=${pipelineName},app.edp.epam.com/stage=${stageName},app.edp.epam.com/app-name=${appName}`
    );

    return argoCDApplicationsURLObject.href;
};
