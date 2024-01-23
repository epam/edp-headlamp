import { DependencyTrackCISecretMock } from '../../mocks/dependencytrack-ci-secret.mock';
import { createDependencyTrackIntegrationSecretInstance } from './index';

describe('testing createDependencyTrackIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createDependencyTrackIntegrationSecretInstance({
      token: 'test-token',
      url: 'https://test-url.com',
    });

    expect(object).toEqual(DependencyTrackCISecretMock);
  });
});
