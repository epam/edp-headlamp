import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CDPipelineKubeObjectConfig } from '../../config';
import { CDPipelineKubeObjectInterface } from '../../types';

const { kind, group, version } = CDPipelineKubeObjectConfig;

export const createCDPipelineInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  }
): CDPipelineKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<CDPipelineKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: name || `your pipeline name`,
    },
    spec: {
      name: name || `your pipeline name`,
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;

    if (!propPath) {
      continue;
    }

    set(base, propPath, propValue);
  }

  return base as CDPipelineKubeObjectInterface;
};
