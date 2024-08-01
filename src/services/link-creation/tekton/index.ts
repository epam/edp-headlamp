import { createURLObjectFromURLOrigin } from '../index';

export const TektonURLService = {
  createPipelineLink: (tektonURLOrigin: string, namespace: string, pipelineName: string) => {
    if (!tektonURLOrigin) {
      return undefined;
    }

    const tektonURLObject = createURLObjectFromURLOrigin(tektonURLOrigin);
    const tektonPipelineURLObject = new URL(
      `/#/namespaces/${namespace}/pipelines/${pipelineName}`,
      tektonURLObject
    );

    return tektonPipelineURLObject.href;
  },
};
