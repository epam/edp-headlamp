import {
    createGerritGitServerSecretInstance,
    createGithubGitServerSecretInstance,
    createGitlabGitServerSecretInstance,
} from './index';

describe('testing createGitServerSecretInstance', () => {
    it('should create correct gerrit git server secret', () => {
        const object = createGerritGitServerSecretInstance({
            sshPrivateKey: 'test private ssh key',
            sshPublicKey: 'test public ssh key',
            username: 'test-username',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: { name: 'gerrit-ciuser-sshkey' },
            data: {
                id_rsa: 'dGVzdCBwcml2YXRlIHNzaCBrZXkK',
                'id_rsa.pub': 'dGVzdCBwdWJsaWMgc3NoIGtleQ==',
                username: 'dGVzdC11c2VybmFtZQ==',
            },
        });
    });

    it('should create correct github git server secret', () => {
        const object = createGithubGitServerSecretInstance({
            sshPrivateKey: 'test private ssh key',
            token: 'test-token',
            username: 'test-username',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: { name: 'ci-github' },
            data: {
                id_rsa: 'dGVzdCBwcml2YXRlIHNzaCBrZXkK',
                token: 'dGVzdC10b2tlbg==',
                username: 'dGVzdC11c2VybmFtZQ==',
            },
        });
    });

    it('should create correct gitlab git server secret', () => {
        const object = createGitlabGitServerSecretInstance({
            sshPrivateKey: 'test private ssh key',
            secretString: 'test-secret-string',
            token: 'test-token',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: { name: 'ci-github' },
            data: {
                id_rsa: 'dGVzdCBwcml2YXRlIHNzaCBrZXkK',
                secretString: 'dGVzdC1zZWNyZXQtc3RyaW5n',
                token: 'dGVzdC10b2tlbg==',
            },
        });
    });
});
