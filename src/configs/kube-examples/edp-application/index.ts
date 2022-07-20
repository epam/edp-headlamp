import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';

const { kind, group, version } = EDPCodebaseKubeObjectConfig;

export const ApplicationExample: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
        name: 'name',
        namespace: 'namespace',
    },
    spec: {
        type: 'application',
    },
};
