import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { createSonarQubeIntegrationSecretInstance } from './index';

describe('testing createSonarQubeIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createSonarQubeIntegrationSecretInstance({
            token: 'test-token',
            url: 'https://test-url.com',
        });

        expect(object).toEqual({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: INTEGRATION_SECRET_NAMES.SONAR,
                labels: { 'app.edp.epam.com/secret-type': 'sonar' },
            },
            type: 'Opaque',
            data: {
                token: 'dGVzdC10b2tlbg==',
                url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
            },
        });
    });
});
