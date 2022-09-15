import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';

export const namespacesMock: DeepPartial<EDPKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Namespace',
            metadata: {
                name: 'namespace-1',
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Namespace',
            metadata: {
                name: 'namespace-2',
            },
        },
    ],
};
