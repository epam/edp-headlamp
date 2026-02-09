import { SSOCISecretMock } from '../../mocks/sso-ci-secret.mock';
import { createSSOIntegrationSecretInstance } from './index';

describe('testing createSSOIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createSSOIntegrationSecretInstance({
      username: 'test-username',
      password: 'test-password',
    });

    expect(object).toEqual(SSOCISecretMock);
  });
});
