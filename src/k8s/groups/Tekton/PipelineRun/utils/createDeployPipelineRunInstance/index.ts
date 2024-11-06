import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../labels';
import { PipelineRunKubeObjectInterface } from '../../types';

export const createDeployPipelineRunInstance = ({
  CDPipeline,
  stage,
  pipelineRunTemplate,
  appPayload,
}: {
  CDPipeline: CDPipelineKubeObjectInterface;
  stage: StageKubeObjectInterface;
  pipelineRunTemplate: PipelineRunKubeObjectInterface;
  appPayload: Record<
    string,
    {
      imageTag: string;
      customValues: boolean;
    }
  >;
}): PipelineRunKubeObjectInterface => {
  const base = { ...pipelineRunTemplate };

  base.metadata.generateName = `deploy-${CDPipeline.metadata.name}-${stage.spec.name}`;

  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE] = CDPipeline.metadata.name;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE] = stage.metadata.name;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] = PIPELINE_TYPES.DEPLOY;

  for (const param of base.spec.params) {
    switch (param.name) {
      case 'CDSTAGE':
        param.value = stage.spec.name;
        break;
      case 'CDPIPELINE':
        param.value = CDPipeline.metadata.name;
        break;
      case 'APPLICATIONS_PAYLOAD':
        param.value = JSON.stringify(appPayload);
        break;
      case 'KUBECONFIG_SECRET_NAME':
        param.value = stage.spec.clusterName;
        break;
      default:
        break;
    }
  }

  return base;
};
