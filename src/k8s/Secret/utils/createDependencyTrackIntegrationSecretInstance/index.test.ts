import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createDependencyTrackIntegrationSecretInstance } from './index';

describe('testing createDependencyTrackIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createDependencyTrackIntegrationSecretInstance({
            token: 'test-token',
            url: 'https://test-url.com',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK,
                labels: { 'app.edp.epam.com/secret-type': 'dependency-track' },
            },
            type: 'Opaque',
            data: { token: 'dGVzdC10b2tlbg==', url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=' },
        });
    });
});
