import { SonarCISecretMock } from '../../mocks/sonar-ci-secret.mock';
import { createSonarQubeIntegrationSecretInstance } from './index';

describe('testing createSonarQubeIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createSonarQubeIntegrationSecretInstance({
      token: 'test-token',
      url: 'https://test-url.com',
    });

    expect(object).toEqual(SonarCISecretMock);
  });
});
