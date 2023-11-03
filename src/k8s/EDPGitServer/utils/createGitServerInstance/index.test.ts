/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { GIT_SERVER_FORM_NAMES } from '../../../../widgets/ManageGitServer/names';
import { createGitServerInstance } from './index';

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createGitServerInstance', () => {
    it('should return valid kube object', () => {
        const object = createGitServerInstance(GIT_SERVER_FORM_NAMES, {
            sshPort: 22,
            httpsPort: 443,
            gitUser: 'git',
            gitProvider: 'gerrit',
            gitHost: 'gerrit.com',
        });

        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'GitServer',
            metadata: { name: 'gerrit.com-8ygse' },
            spec: {
                gitHost: 'gerrit.com',
                nameSshKeySecret: 'gerrit-ciuser-sshkey',
                sshPort: 22,
                httpsPort: 443,
                gitUser: 'git',
                gitProvider: 'gerrit',
            },
        });
    });
});
