import { createVClusterApplication } from '.';

describe('testing createVClusterApplication', () => {
  it('should return valid kube object', () => {
    const object = createVClusterApplication({
      namespace: 'test-namespace',
      clusterName: 'test-cluster-name',
    });

    expect(object).toEqual({
      apiVersion: 'argoproj.io/v1alpha1',
      kind: 'Application',
      metadata: {
        name: 'test-namespace-test-cluster-name',
        namespace: 'test-namespace',
        labels: {
          'app.edp.epam.com/app-type': 'cluster',
        },
      },
      spec: {
        project: 'test-namespace',
        source: {
          repoURL: 'https://github.com/loft-sh/vcluster',
          targetRevision: 'v0.20.0',
          path: 'chart',
          helm: {
            parameters: [
              {
                name: 'controlPlane.statefulSet.image.tag',
                value: '0.20.0',
              },
              {
                name: 'exportKubeConfig.server',
                value: 'https://test-cluster-name.test-namespace.svc:443',
              },
              {
                name: 'controlPlane.statefulSet.persistence.volumeClaim.retentionPolicy',
                value: 'Delete',
              },
            ],
          },
        },
        destination: {
          server: 'https://kubernetes.default.svc',
          namespace: 'test-namespace',
        },
        syncPolicy: { automated: { prune: true, selfHeal: true } },
      },
    });
  });
});
