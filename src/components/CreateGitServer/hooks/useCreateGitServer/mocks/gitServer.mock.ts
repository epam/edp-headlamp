import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { DeepPartial } from '../../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../../types/k8s';

export const gitServerMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'GitServer',
    metadata: {
        name: 'gerrit',
        namespace: 'test-namespace',
    },
    spec: {
        gitHost: 'gerrit',
        gitUser: 'edp-ci',
        httpsPort: 443,
        nameSshKeySecret: 'secret-name',
        sshPort: 30010,
    },
};

export const gitServerSecretMock: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: 'secret-name',
        namespace: 'test-namespace',
    },
    data: {
        id_rsa: 'test-ssh-private-key',
        'id_rsa.pub': 'test-ssh-public-key',
        secretString: 'secret-string',
        token: 'token',
        username: 'username',
    },
};
