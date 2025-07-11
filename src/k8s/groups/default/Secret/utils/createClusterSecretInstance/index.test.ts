import { createBearerClusterSecretInstance, createIRSAClusterSecretInstance } from './index';

describe('testing createBearerClusterSecretInstance', () => {
  it('should create correct object when skipTLSVerify is off', () => {
    const object = createBearerClusterSecretInstance({
      clusterMetadataName: 'test-cluster-name-cluster',
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
        name: 'test-cluster-name-cluster',
        labels: {
          'app.edp.epam.com/secret-type': 'cluster',
          'app.edp.epam.com/cluster-type': 'bearer',
        },
      },
      data: {
        config:
          'eyJhcGlWZXJzaW9uIjoidjEiLCJraW5kIjoiQ29uZmlnIiwiY3VycmVudC1jb250ZXh0IjoiZGVmYXVsdC1jb250ZXh0IiwicHJlZmVyZW5jZXMiOnt9LCJjbHVzdGVycyI6W3siY2x1c3RlciI6eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCIsImNlcnRpZmljYXRlLWF1dGhvcml0eS1kYXRhIjoidGVzdC1jbHVzdGVyLWNlcnRpZmljYXRlIn0sIm5hbWUiOiJ0ZXN0LWNsdXN0ZXItbmFtZSJ9XSwiY29udGV4dHMiOlt7ImNvbnRleHQiOnsiY2x1c3RlciI6InRlc3QtY2x1c3Rlci1uYW1lIiwidXNlciI6ImRlZmF1bHQtdXNlciJ9LCJuYW1lIjoiZGVmYXVsdC1jb250ZXh0In1dLCJ1c2VycyI6W3sidXNlciI6eyJ0b2tlbiI6InRlc3QtY2x1c3Rlci10b2tlbiJ9LCJuYW1lIjoiZGVmYXVsdC11c2VyIn1dfQ==',
      },
    });
  });

  it('should create correct object when skipTLSVerify is on', () => {
    const object = createBearerClusterSecretInstance({
      clusterMetadataName: 'test-cluster-name-cluster',
      clusterName: 'test-cluster-name',
      clusterToken: 'test-cluster-token',
      clusterHost: 'test-cluster-host',
      skipTLSVerify: true,
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-cluster-name-cluster',
        labels: {
          'app.edp.epam.com/secret-type': 'cluster',
          'app.edp.epam.com/cluster-type': 'bearer',
        },
      },
      data: {
        config:
          'eyJhcGlWZXJzaW9uIjoidjEiLCJraW5kIjoiQ29uZmlnIiwiY3VycmVudC1jb250ZXh0IjoiZGVmYXVsdC1jb250ZXh0IiwicHJlZmVyZW5jZXMiOnt9LCJjbHVzdGVycyI6W3siY2x1c3RlciI6eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCIsImluc2VjdXJlLXNraXAtdGxzLXZlcmlmeSI6dHJ1ZX0sIm5hbWUiOiJ0ZXN0LWNsdXN0ZXItbmFtZSJ9XSwiY29udGV4dHMiOlt7ImNvbnRleHQiOnsiY2x1c3RlciI6InRlc3QtY2x1c3Rlci1uYW1lIiwidXNlciI6ImRlZmF1bHQtdXNlciJ9LCJuYW1lIjoiZGVmYXVsdC1jb250ZXh0In1dLCJ1c2VycyI6W3sidXNlciI6eyJ0b2tlbiI6InRlc3QtY2x1c3Rlci10b2tlbiJ9LCJuYW1lIjoiZGVmYXVsdC11c2VyIn1dfQ==',
      },
    });
  });
});

describe('testing createIRSAClusterSecretInstance', () => {
  it('should create correct object', () => {
    const object = createIRSAClusterSecretInstance({
      clusterMetadataName: 'test-cluster-name-cluster',
      clusterName: 'test-cluster-name',
      clusterHost: 'test-cluster-host',
      roleARN: 'test-role-arn',
      caData: 'test-ca-data',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-cluster-name-cluster',
        labels: {
          'app.edp.epam.com/secret-type': 'cluster',
          'app.edp.epam.com/cluster-type': 'irsa',
          'argocd.argoproj.io/secret-type': 'cluster',
        },
      },
      data: {
        config:
          'eyJzZXJ2ZXIiOiJ0ZXN0LWNsdXN0ZXItaG9zdCIsImF3c0F1dGhDb25maWciOnsiY2x1c3Rlck5hbWUiOiJ0ZXN0LWNsdXN0ZXItbmFtZSIsInJvbGVBUk4iOiJ0ZXN0LXJvbGUtYXJuIn0sInRsc0NsaWVudENvbmZpZyI6eyJpbnNlY3VyZSI6ZmFsc2UsImNhRGF0YSI6InRlc3QtY2EtZGF0YSJ9fQ==',
        name: 'dGVzdC1jbHVzdGVyLW5hbWU=',
        server: 'dGVzdC1jbHVzdGVyLWhvc3Q=',
      },
    });
  });
});
