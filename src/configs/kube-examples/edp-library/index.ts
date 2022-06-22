import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { DeepPartial } from '../../../types/global';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';

const {
    name: { singularForm },
    group,
    version,
} = EDPCodebaseKubeObjectConfig;

export const LibraryExample: DeepPartial<KubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind: capitalizeFirstLetter(singularForm),
    metadata: {
        name: 'name',
        namespace: 'namespace',
    },
    spec: {
        type: 'library',
    },
};
