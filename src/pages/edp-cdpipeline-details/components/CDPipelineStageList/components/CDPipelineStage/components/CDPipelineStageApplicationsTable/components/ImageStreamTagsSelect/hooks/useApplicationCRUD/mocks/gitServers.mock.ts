import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../../k8s/EDPGitServer/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const gitServersMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'GitServer',
            metadata: {
                name: 'github',
                namespace: 'test-namespace',
            },
            spec: {
                gitHost: 'github.com',
                gitProvider: 'github',
                gitUser: 'git',
                httpsPort: 443,
                nameSshKeySecret: 'github',
                sshPort: 22,
            },
        },
    ],
};
