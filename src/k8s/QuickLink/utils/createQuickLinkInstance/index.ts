import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { QuickLinkKubeObjectConfig } from '../../config';
import { QuickLinkKubeObjectInterface } from '../../types';

const { kind, group, version } = QuickLinkKubeObjectConfig;

export const createQuickLinkInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  }
): QuickLinkKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<QuickLinkKubeObjectInterface> = {
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

  return base as QuickLinkKubeObjectInterface;
};
