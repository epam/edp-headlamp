import { createSonarQubeIntegrationSecretInstance } from './index';

describe('testing createSonarQubeIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createSonarQubeIntegrationSecretInstance({
            user: 'test-user',
            secret: 'test-password',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'sonar-ciuser-token',
                labels: { 'app.edp.epam.com/secret-type': 'sonar' },
            },
            type: 'Opaque',
            data: { username: 'dGVzdC11c2Vy', secret: 'dGVzdC1wYXNzd29yZA==' },
        });
    });
});
