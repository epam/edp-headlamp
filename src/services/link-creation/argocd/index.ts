import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../k8s/groups/ArgoCD/Application/labels';
import { createURLObjectFromURLOrigin } from '../index';

export const ArgoCDURLService = {
  createPipelineLink: (argoCDURLOrigin: string | undefined, pipelineName: string | undefined) => {
    if (!argoCDURLOrigin || !pipelineName) {
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
    argoCDURLOrigin: string | undefined,
    pipelineName: string | undefined,
    stageName: string | undefined,
    appName: string | undefined
  ) => {
    if (!argoCDURLOrigin || !pipelineName || !stageName || !appName) {
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
  createStageLink: (
    argoCDURLOrigin: string | undefined,
    pipelineName: string | undefined,
    stageName: string | undefined
  ) => {
    if (!argoCDURLOrigin || !pipelineName || !stageName) {
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
