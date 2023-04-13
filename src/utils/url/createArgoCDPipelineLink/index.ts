import { createURLObjectFromURLOrigin } from '../createURLObjectFromURLOrigin';

export const createArgoCDPipelineLink = (argoCDURLOrigin: string, pipelineName: string) => {
    if (!argoCDURLOrigin) {
        return;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
        'labels',
        `app.edp.epam.com/pipeline=${pipelineName}`
    );

    return argoCDApplicationsURLObject.href;
};
