import { createClusterSecretInstance } from './index';

describe('testing createClusterSecretInstance', () => {
  it('should create correct object when skipTLSVerify is off', () => {
    const object = createClusterSecretInstance({
      clusterName: 'test-cluster-name',
      clusterToken: 'test-cluster-token',
      clusterHost: 'test-cluster-host',
      skipTLSVerify: false,
      clusterCertificate: 'test-cluster-certificate',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-cluster-name',
        labels: { 'argocd.argoproj.io/secret-type': 'cluster' },
      },
      data: {
        config:
          'eyJhcGlWZXJzaW9uIjoidjEiLCJraW5kIjoiQ29uZmlnIiwiY3VycmVudC1jb250ZXh0IjoiZGVmYXVsdC1jb250ZXh0IiwicHJlZmVyZW5jZXMiOnt9LCJjbHVzdGVycyI6W3siY2x1c3RlciI6eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCIsImNlcnRpZmljYXRlLWF1dGhvcml0eS1kYXRhIjoidGVzdC1jbHVzdGVyLWNlcnRpZmljYXRlIn0sIm5hbWUiOiJkZWZhdWx0LWNsdXN0ZXIifV0sImNvbnRleHRzIjpbeyJjb250ZXh0Ijp7ImNsdXN0ZXIiOiJkZWZhdWx0LWNsdXN0ZXIiLCJ1c2VyIjoiZGVmYXVsdC11c2VyIn0sIm5hbWUiOiJkZWZhdWx0LWNvbnRleHQifV0sInVzZXJzIjpbeyJ1c2VyIjp7InRva2VuIjoidGVzdC1jbHVzdGVyLXRva2VuIn0sIm5hbWUiOiJkZWZhdWx0LXVzZXIifV19',
      },
    });
  });

  it('should create correct object when skipTLSVerify is on', () => {
    const object = createClusterSecretInstance({
      clusterName: 'test-cluster-name',
      clusterToken: 'test-cluster-token',
      clusterHost: 'test-cluster-host',
      skipTLSVerify: true,
      clusterCertificate: undefined,
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-cluster-name',
        labels: { 'argocd.argoproj.io/secret-type': 'cluster' },
      },
      data: {
        config:
          'eyJhcGlWZXJzaW9uIjoidjEiLCJraW5kIjoiQ29uZmlnIiwiY3VycmVudC1jb250ZXh0IjoiZGVmYXVsdC1jb250ZXh0IiwicHJlZmVyZW5jZXMiOnt9LCJjbHVzdGVycyI6W3siY2x1c3RlciI6eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCIsImluc2VjdXJlLXNraXAtdGxzLXZlcmlmeSI6dHJ1ZX0sIm5hbWUiOiJkZWZhdWx0LWNsdXN0ZXIifV0sImNvbnRleHRzIjpbeyJjb250ZXh0Ijp7ImNsdXN0ZXIiOiJkZWZhdWx0LWNsdXN0ZXIiLCJ1c2VyIjoiZGVmYXVsdC11c2VyIn0sIm5hbWUiOiJkZWZhdWx0LWNvbnRleHQifV0sInVzZXJzIjpbeyJ1c2VyIjp7InRva2VuIjoidGVzdC1jbHVzdGVyLXRva2VuIn0sIm5hbWUiOiJkZWZhdWx0LXVzZXIifV19',
      },
    });
  });
});
