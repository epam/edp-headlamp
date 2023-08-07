import { createNexusIntegrationSecretInstance } from './index';

describe('testing createNexusIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createNexusIntegrationSecretInstance({
            user: 'test-user',
            password: 'test-password',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'nexus-ci.user',
                labels: { 'app.edp.epam.com/secret-type': 'nexus' },
            },
            type: 'Opaque',
            data: { username: 'dGVzdC11c2Vy', password: 'dGVzdC1wYXNzd29yZA==' },
        });
    });
});
