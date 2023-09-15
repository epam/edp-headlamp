import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createNexusIntegrationSecretInstance } from './index';

describe('testing createNexusIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createNexusIntegrationSecretInstance({
            username: 'test-user',
            password: 'test-password',
            url: 'https://test-url.com',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.NEXUS,
                labels: { 'app.edp.epam.com/secret-type': 'nexus' },
            },
            type: 'Opaque',
            data: {
                username: 'dGVzdC11c2Vy',
                password: 'dGVzdC1wYXNzd29yZA==',
                url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
            },
        });
    });
});
