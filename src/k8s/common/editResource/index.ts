import { set } from 'lodash';
import { FormNameObject } from '../../../types/forms';
import { EDPKubeObjectInterface } from '../../../types/k8s';

export const editResource = <T extends EDPKubeObjectInterface>(
  names: {
    [key: string]: FormNameObject;
  },
  currentResource: T,
  formValues: {
    [key: string]: any;
  }
): T => {
  const base = { ...currentResource };

  for (const [propKey, propValue] of Object.entries(formValues)) {
    if (names[propKey]?.notUsedInFormData) {
      continue;
    }

    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base;
};
