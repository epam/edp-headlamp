import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createSSOIntegrationSecretInstance } from './index';

describe('testing createSSOIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createSSOIntegrationSecretInstance({
            username: 'test-user',
            password: 'test-password',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.SSO,
                labels: { 'app.edp.epam.com/secret-type': 'keycloak' },
            },
            type: 'Opaque',
            data: {
                username: 'dGVzdC11c2Vy',
                password: 'dGVzdC1wYXNzd29yZA==',
            },
        });
    });
});
