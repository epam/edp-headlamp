import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createDefectDojoIntegrationSecretInstance } from './index';

describe('testing createDefectDojoIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createDefectDojoIntegrationSecretInstance({
            token: 'test-token',
            url: 'https://test-url.com',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.DEFECT_DOJO,
                labels: { 'app.edp.epam.com/secret-type': 'defectdojo' },
            },
            type: 'Opaque',
            data: { token: 'dGVzdC10b2tlbg==', url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=' },
        });
    });
});
