import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPComponentKubeObjectConfig } from '../../config';
import { EDPComponentKubeObjectInterface } from '../../types';

const { kind, group, version } = EDPComponentKubeObjectConfig;

export const createEDPComponentInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  }
): EDPComponentKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<EDPComponentKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: name || 'your component name',
    },
    spec: {
      type: name || 'your component name',
      visible: true,
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base as EDPComponentKubeObjectInterface;
};
