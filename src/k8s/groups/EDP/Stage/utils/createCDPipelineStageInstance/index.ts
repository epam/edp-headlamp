import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CDPipelineKubeObjectInterface } from '../../../CDPipeline/types';
import { StageKubeObjectConfig } from '../../config';
import { StageKubeObjectInterface } from '../../types';

const { kind, group, version } = StageKubeObjectConfig;

export const createCDPipelineStageInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  },
  CDPipeline: CDPipelineKubeObjectInterface
): StageKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<StageKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: `${CDPipeline.metadata.name}-${name || 'your stage name'}`,
      namespace: CDPipeline.metadata.namespace,
    },
    spec: {
      name: name || `your stage name`,
      cdPipeline: CDPipeline.metadata.name,
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base as StageKubeObjectInterface;
};
