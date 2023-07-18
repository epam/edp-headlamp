import { createGitServerSecretInstance } from './index';

describe('testing createGitServerSecretInstance', () => {
    it('should create correct object', () => {
        const object = createGitServerSecretInstance({
            name: 'test-host-name.com-n84o8',
            gitUser: 'git',
            token: 'test access token',
            sshPrivateKey: 'test private ssh key',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: { name: 'test-host-name.com-n84o8-config' },
            data: {
                username: 'Z2l0',
                id_rsa: 'dGVzdCBwcml2YXRlIHNzaCBrZXkK',
                token: 'dGVzdCBhY2Nlc3MgdG9rZW4=',
            },
        });
    });
});
