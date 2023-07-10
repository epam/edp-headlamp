import { DeepPartial } from '../../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../../types/k8s';

export const gitServerSecretMock: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: 'secret-name',
        namespace: 'test-namespace',
    },
    data: {
        id_rsa: 'test-ssh-private-key',
        token: 'token',
        username: 'username',
    },
};
