import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../k8s/Application/labels';
import { createURLObjectFromURLOrigin } from '../index';

export const ArgoCDURLService = {
  createPipelineLink: (argoCDURLOrigin: string, pipelineName: string) => {
    if (!argoCDURLOrigin) {
      return undefined;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
      'labels',
      `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName}`
    );

    return argoCDApplicationsURLObject.href;
  },
  createApplicationLink: (
    argoCDURLOrigin: string,
    pipelineName: string,
    stageName: string,
    appName: string
  ) => {
    if (!argoCDURLOrigin) {
      return undefined;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
      'labels',
      `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageName},${APPLICATION_LABEL_SELECTOR_APP_NAME}=${appName}`
    );

    return argoCDApplicationsURLObject.href;
  },
  createStageLink: (argoCDURLOrigin: string, pipelineName: string, stageName: string) => {
    if (!argoCDURLOrigin) {
      return undefined;
    }

    const argoCDURLObject = createURLObjectFromURLOrigin(argoCDURLOrigin);
    const argoCDApplicationsURLObject = new URL('/applications', argoCDURLObject);
    argoCDApplicationsURLObject.searchParams.append(
      'labels',
      `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${pipelineName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageName}`
    );

    return argoCDApplicationsURLObject.href;
  },
};
