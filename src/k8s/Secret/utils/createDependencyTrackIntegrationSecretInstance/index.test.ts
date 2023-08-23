import { createDependencyTrackIntegrationSecretInstance } from './index';

describe('testing createDependencyTrackIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createDependencyTrackIntegrationSecretInstance({
            token: 'test-token',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'ci-dependency-track',
                labels: { 'app.edp.epam.com/secret-type': 'dependency-track' },
            },
            type: 'Opaque',
            data: { token: 'dGVzdC10b2tlbg==' },
        });
    });
});
