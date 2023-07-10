import { GIT_SERVER_NAMES } from '../../../../widgets/CreateGitServer/components/CreateGitServerForm/names';
import { createGitServerInstance } from './index';

describe('testing createGitServerInstance', () => {
    it('should return valid kube object', () => {
        const object = createGitServerInstance(
            GIT_SERVER_NAMES,
            {
                sshPort: 22,
                httpsPort: 443,
                gitUser: 'git',
                gitProvider: 'gerrit',
                gitHost: 'github.com',
            },
            '9caw7'
        );

        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'GitServer',
            metadata: { name: 'github.com-9caw7' },
            spec: {
                gitHost: 'github.com',
                nameSshKeySecret: 'github.com-9caw7-config',
                sshPort: 22,
                httpsPort: 443,
                gitUser: 'git',
                gitProvider: 'gerrit',
            },
        });
    });
});
