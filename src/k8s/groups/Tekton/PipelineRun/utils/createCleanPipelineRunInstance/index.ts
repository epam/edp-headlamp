import { cloneDeep } from 'lodash';
import { PIPELINE_TYPE } from '../../../../../../constants/pipelineTypes';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { truncateName } from '../../../../../../utils/truncateName';
import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../labels';
import { PipelineRunKubeObjectInterface } from '../../types';

export const createCleanPipelineRunInstance = ({
  CDPipeline,
  stage,
  pipelineRunTemplate,
}: {
  CDPipeline: CDPipelineKubeObjectInterface;
  stage: StageKubeObjectInterface;
  pipelineRunTemplate: PipelineRunKubeObjectInterface;
}): PipelineRunKubeObjectInterface => {
  const base = cloneDeep(pipelineRunTemplate);

  const namePrefix = `clean-`;
  const namePostfix = `-${createRandomString(4)}`;

  const truncatedName = truncateName(
    `${CDPipeline.metadata.name}-${stage.spec.name}`,
    namePrefix.length + namePostfix.length
  );

  const fullPipelineRunName = `${namePrefix}${truncatedName}${namePostfix}`;

  delete base.metadata.generateName;

  base.metadata.name = fullPipelineRunName;

  base.metadata.labels = base.metadata.labels || {};
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE] = CDPipeline.metadata.name;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE] = stage.metadata.name;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] = PIPELINE_TYPE.CLEAN;

  for (const param of base.spec.params) {
    switch (param.name) {
      case 'CDSTAGE':
        param.value = stage.spec.name;
        break;
      case 'CDPIPELINE':
        param.value = CDPipeline.metadata.name;
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
