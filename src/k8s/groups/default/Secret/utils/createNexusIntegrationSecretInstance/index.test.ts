import { NexusCISecretMock } from '../../mocks/nexus-ci-secret.mock';
import { createNexusIntegrationSecretInstance } from './index';

describe('testing createNexusIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createNexusIntegrationSecretInstance({
      username: 'test-username',
      password: 'test-password',
      url: 'https://test-url.com',
    });

    expect(object).toEqual(NexusCISecretMock);
  });
});
