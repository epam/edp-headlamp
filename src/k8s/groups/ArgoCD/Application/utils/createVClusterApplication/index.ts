import { APPLICATION_LABEL_SELECTOR_APP_TYPE } from '../../labels';

export const createVClusterApplication = ({
  namespace,
  clusterName,
}: {
  namespace: string;
  clusterName: string;
}) => {
  return {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
      name: `${namespace}-${clusterName}`,
      namespace: namespace,
      labels: {
        [APPLICATION_LABEL_SELECTOR_APP_TYPE]: 'cluster',
      },
    },
    spec: {
      project: namespace,
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
              value: `https://${clusterName}.${namespace}.svc:443`,
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
        namespace: namespace,
      },
      syncPolicy: {
        automated: {
          prune: true,
          selfHeal: true,
        },
      },
    },
  };
};
