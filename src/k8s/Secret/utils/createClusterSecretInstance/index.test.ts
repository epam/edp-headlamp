import { createClusterSecretInstance } from './index';

describe('testing createClusterSecretInstance', () => {
  it('should create correct object', () => {
    const object = createClusterSecretInstance({
      clusterName: 'test-cluster-name',
      clusterToken: 'test-cluster-token',
      clusterHost: 'test-cluster-host',
      clusterCertificate: 'test-cluster-certificate',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-cluster-name',
        labels: { 'argocd.argoproj.io/secret-type': 'cluster' },
      },
      type: 'Opaque',
      stringData: {
        name: 'test-cluster-name',
        server: 'test-cluster-host',
        config:
          '{"tlsClientConfig":{"insecure":false,"caData":"test-cluster-certificate"},"bearerToken":"test-cluster-token"}',
      },
    });
  });
});
