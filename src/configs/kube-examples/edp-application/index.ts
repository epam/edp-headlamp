import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';

const {
    name: { singularForm },
    group,
    version,
} = EDPCodebaseKubeObjectConfig;

export const ApplicationExample: DeepPartial<EDPKubeObjectInterface> = {
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
