import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createJiraIntegrationSecretInstance } from './index';

describe('testing createJiraIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createJiraIntegrationSecretInstance({
            username: 'test-user',
            password: 'test-password',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.JIRA,
                labels: { 'app.edp.epam.com/secret-type': 'jira' },
            },
            type: 'Opaque',
            data: {
                username: 'dGVzdC11c2Vy',
                password: 'dGVzdC1wYXNzd29yZA==',
            },
        });
    });
});
