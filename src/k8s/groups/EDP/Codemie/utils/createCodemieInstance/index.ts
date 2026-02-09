import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CodemieFormValues } from '../../../../../../widgets/ManageCodeMie/types';
import { CodemieKubeObjectConfig } from '../../config';
import { CodemieKubeObjectInterface } from '../../types';

const { kind, group, version } = CodemieKubeObjectConfig;

export const createCodemieInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: CodemieFormValues
): CodemieKubeObjectInterface => {
  const { name, ...restProps } = formValues;

  const base: DeepPartial<CodemieKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: name,
    },
    spec: {
      oidc: {
        secretRef: {
          name,
          clientKey: 'client_id',
          secretKey: 'client_secret',
        },
      },
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    if (!propPath) {
      continue;
    }

    set(base, propPath, propValue);
  }

  return base as CodemieKubeObjectInterface;
};
