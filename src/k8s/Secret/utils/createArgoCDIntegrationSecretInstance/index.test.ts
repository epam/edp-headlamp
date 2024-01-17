import { ArgoCDCISecretMock } from '../../mocks/argo-cd-ci-secret.mock';
import { createArgoCDIntegrationSecretInstance } from './index';

describe('testing createArgoCDIntegrationSecretInstance', () => {
    it('should create correct object', () => {
        const object = createArgoCDIntegrationSecretInstance({
            token: 'test-token',
            url: 'https://test-url.com',
        });

        expect(object).toEqual(ArgoCDCISecretMock);
    });
});
