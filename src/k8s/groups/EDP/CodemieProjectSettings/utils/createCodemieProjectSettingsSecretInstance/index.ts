import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { safeEncode } from '../../../../../../utils/decodeEncode';
import { CodemieProjectSettingsSecretFormValues } from '../../../../../../widgets/ManageCodeMie/types';
import {
  SECRET_LABEL_ASSOCIATED_KIND,
  SECRET_LABEL_SECRET_TYPE,
} from '../../../../default/Secret/labels';
import { CodemieProjectSettingsKubeObjectConfig } from '../../config';

export const createCodemieProjectSettingsSecretInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: CodemieProjectSettingsSecretFormValues
): DeepPartial<EDPKubeObjectInterface> => {
  const { projectName, token, ...restProps } = formValues;

  const base: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: `${projectName}-git`,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'codemie',
        [SECRET_LABEL_ASSOCIATED_KIND]: CodemieProjectSettingsKubeObjectConfig.kind,
      },
    },
    data: {
      token: safeEncode(token),
    },
    type: 'Opaque',
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base;
};
