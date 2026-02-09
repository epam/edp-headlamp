import { DefectDojoCISecretMock } from '../../mocks/defectdojo-ci-secret.mock';
import { createDefectDojoIntegrationSecretInstance } from './index';

describe('testing createDefectDojoIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createDefectDojoIntegrationSecretInstance({
      token: 'test-token',
      url: 'https://test-url.com',
    });

    expect(object).toEqual(DefectDojoCISecretMock);
  });
});
