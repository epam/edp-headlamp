import { createRegistrySecretInstance } from './index';

describe('testing createRegistrySecretInstance', () => {
  it('should create correct object', () => {
    const object = createRegistrySecretInstance({
      name: 'test',
      registryEndpoint: 'test-registry-endpoint.com',
      user: 'test-user',
      password: 'test-password',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test',
        labels: {
          'app.edp.epam.com/secret-type': 'registry',
          'app.edp.epam.com/integration-secret': 'true',
        },
      },
      type: 'kubernetes.io/dockerconfigjson',
      data: {
        '.dockerconfigjson':
          'eyJhdXRocyI6eyJ0ZXN0LXJlZ2lzdHJ5LWVuZHBvaW50LmNvbSI6eyJ1c2VybmFtZSI6InRlc3QtdXNlciIsInBhc3N3b3JkIjoidGVzdC1wYXNzd29yZCIsImF1dGgiOiJkR1Z6ZEMxMWMyVnlPblJsYzNRdGNHRnpjM2R2Y21RPSJ9fX0=',
      },
    });
  });
});
