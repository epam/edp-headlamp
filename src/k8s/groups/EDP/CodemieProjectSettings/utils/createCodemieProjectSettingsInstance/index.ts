import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CodemieProjectSettingsFormValues } from '../../../../../../widgets/ManageCodeMie/types';
import { CodemieProjectSettingsKubeObjectConfig } from '../../config';
import { CodemieProjectSettingsKubeObjectInterface } from '../../types';

const { kind, group, version } = CodemieProjectSettingsKubeObjectConfig;

export const createCodemieProjectSettingsInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: CodemieProjectSettingsFormValues
): CodemieProjectSettingsKubeObjectInterface => {
  const { projectName, ...restProps } = formValues;

  const base: DeepPartial<CodemieProjectSettingsKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: `${projectName}-git`,
    },
    spec: {
      projectName,
      codemieRef: {
        kind: 'Codemie',
      },
      gitCredential: {
        secretRef: {
          name: `${projectName}-git`,
          secretKey: 'token',
        },
      },
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base as CodemieProjectSettingsKubeObjectInterface;
};
