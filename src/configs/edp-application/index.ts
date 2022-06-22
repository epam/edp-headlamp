import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

const {
  name: { singularForm },
  group,
  version,
} = EDPCodebaseKubeObjectConfig;

export const ApplicationExample: any = {
  apiVersion: `${group}/${version}`,
  kind: capitalizeFirstLetter(singularForm),
  metadata: {
    name: 'name',
    namespace: 'namespace',
  },
  spec: {
    type: 'application',
  },
};
