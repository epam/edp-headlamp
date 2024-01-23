import { DeepPartial } from '../../../../types/global';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';

export const gitServerMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
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
};
