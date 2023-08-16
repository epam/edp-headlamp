import { createDefectDojoIntegrationSecretInstance } from './index';

describe('testing createDefectDojoIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createDefectDojoIntegrationSecretInstance({
            token: 'test-token',
            url: 'test-url',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'defectdojo-ciuser-token',
                labels: { 'app.edp.epam.com/secret-type': 'defectdojo' },
            },
            type: 'Opaque',
            data: { token: 'dGVzdC10b2tlbg==', url: 'dGVzdC11cmw=' },
        });
    });
});
