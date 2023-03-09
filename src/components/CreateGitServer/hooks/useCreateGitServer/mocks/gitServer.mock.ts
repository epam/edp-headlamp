import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { DeepPartial } from '../../../../../types/global';

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
