import { createJiraIntegrationSecretInstance } from './index';

describe('testing createJiraIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createJiraIntegrationSecretInstance({
            user: 'test-user',
            password: 'test-password',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'jira-user',
                labels: { 'app.edp.epam.com/secret-type': 'jira' },
            },
            type: 'Opaque',
            data: { username: 'dGVzdC11c2Vy', password: 'dGVzdC1wYXNzd29yZA==' },
        });
    });
});
