import { set } from 'lodash';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { CodemieProjectFormValues } from '../../../../../../widgets/ManageCodeMie/types';
import { CodemieProjectKubeObjectConfig } from '../../config';
import { CodemieProjectKubeObjectInterface } from '../../types';

const { kind, group, version } = CodemieProjectKubeObjectConfig;

export const createCodemieProjectInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: CodemieProjectFormValues
): CodemieProjectKubeObjectInterface => {
  const { projectName, ...restProps } = formValues;

  const base: DeepPartial<CodemieProjectKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name: projectName,
    },
    spec: {
      name: projectName,
      codemieRef: {
        kind: 'Codemie',
      },
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    set(base, propPath, propValue);
  }

  return base as CodemieProjectKubeObjectInterface;
};
