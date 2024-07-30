import { DeepPartial } from '../../../../../types/global';
import { ApplicationKubeObjectInterface } from '../types';

export const expectedApplicationOutputMock: DeepPartial<ApplicationKubeObjectInterface> = {
  apiVersion: 'argoproj.io/v1alpha1',
  kind: 'Application',
  metadata: {
    name: 'test-app-name-8ygse',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/stage': 'test-stage-name',
      'app.edp.epam.com/pipeline': 'test-pipeline-name',
      'app.edp.epam.com/app-name': 'test-app-name',
    },
    // @ts-ignore
    finalizers: ['resources-finalizer.argocd.argoproj.io'],
    ownerReferences: [
      {
        apiVersion: 'v2.edp.epam.com/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Stage',
        name: 'test-pipeline-name-test-stage-name',
        uid: undefined,
      },
    ],
  },
  spec: {
    project: 'test-namespace',
    destination: {
      namespace: 'test-namespace-test-pipeline-name-test-stage-name',
      name: 'test-cluster-name',
    },
    source: {
      helm: {
        releaseName: 'test-app-name',
        parameters: [
          { name: 'image.tag', value: 'test-image-tag' },
          {
            name: 'image.repository',
            value: 'test-registry/test-namespace/test-app-name',
          },
        ],
      },
      path: 'deploy-templates',
      repoURL: 'ssh://git@github.com:111/test-namespace/test-app-name',
      targetRevision: 'test-image-tag',
    },
    syncPolicy: {
      syncOptions: ['CreateNamespace=true'],
      automated: { selfHeal: true, prune: true },
    },
  },
};
export const expectedApplicationOutputMockWithValuesOverride: DeepPartial<ApplicationKubeObjectInterface> =
  {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
      name: 'test-app-name-8ygse',
      namespace: 'test-namespace',
      labels: {
        'app.edp.epam.com/stage': 'test-stage-name',
        'app.edp.epam.com/pipeline': 'test-pipeline-name',
        'app.edp.epam.com/app-name': 'test-app-name',
      },
      // @ts-ignore
      finalizers: ['resources-finalizer.argocd.argoproj.io'],
      ownerReferences: [
        {
          apiVersion: 'v2.edp.epam.com/v1',
          blockOwnerDeletion: true,
          controller: true,
          kind: 'Stage',
          name: 'test-pipeline-name-test-stage-name',
          uid: undefined,
        },
      ],
    },
    spec: {
      project: 'test-namespace',
      destination: {
        namespace: 'test-namespace-test-pipeline-name-test-stage-name',
        name: 'test-cluster-name',
      },
      // @ts-ignore
      sources: [
        {
          repoURL: 'ssh://git@github.com:111/edp-gitops',
          targetRevision: 'main',
          ref: 'values',
        },
        {
          helm: {
            valueFiles: ['$values/test-pipeline-name/test-stage-name/test-app-name-values.yaml'],
            parameters: [
              { name: 'image.tag', value: 'test-image-tag' },
              {
                name: 'image.repository',
                value: 'test-registry/test-namespace/test-app-name',
              },
            ],
            releaseName: 'test-app-name',
          },
          path: 'deploy-templates',
          repoURL: 'ssh://git@github.com:111/test-namespace/test-app-name',
          targetRevision: 'test-image-tag',
        },
      ],
      syncPolicy: {
        syncOptions: ['CreateNamespace=true'],
        automated: { selfHeal: true, prune: true },
      },
    },
  };
export const expectedApplicationAfterEditOutputMock: DeepPartial<ApplicationKubeObjectInterface> = {
  apiVersion: 'argoproj.io/v1alpha1',
  kind: 'Application',
  metadata: {
    labels: {
      'app.edp.epam.com/app-name': 'test-app-name',
      'app.edp.epam.com/pipeline': 'demo',
      'app.edp.epam.com/stage': 'sit',
    },
    name: 'test-app-name-t2yfb',
    namespace: 'test-namespace',
  },
  spec: {
    destination: { name: 'in-cluster', namespace: 'test-namespace-demo-sit' },
    project: 'test-namespace',
    syncPolicy: {
      automated: { prune: true, selfHeal: true },
      syncOptions: ['CreateNamespace=true'],
    },
    source: {
      helm: {
        releaseName: 'test-app-name',
        parameters: [
          { name: 'image.tag', value: 'test-image-tag' },
          {
            name: 'image.repository',
            value: 'test-registry/test-namespace/test-app-name',
          },
        ],
      },
      path: 'deploy-templates',
      repoURL: 'ssh://git@github.com:111/test-namespace/test-app-name',
      targetRevision: 'test-image-tag',
    },
  },
};
export const expectedApplicationAfterEditOutputMockWithValuesOverride: DeepPartial<ApplicationKubeObjectInterface> =
  {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
      labels: {
        'app.edp.epam.com/app-name': 'test-app-name',
        'app.edp.epam.com/pipeline': 'demo',
        'app.edp.epam.com/stage': 'sit',
      },
      name: 'test-app-name-t2yfb',
      namespace: 'test-namespace',
    },
    spec: {
      destination: { name: 'in-cluster', namespace: 'test-namespace-demo-sit' },
      project: 'test-namespace',
      syncPolicy: {
        automated: { prune: true, selfHeal: true },
        syncOptions: ['CreateNamespace=true'],
      },
      // @ts-ignore
      sources: [
        {
          repoURL: 'ssh://git@github.com:111/edp-gitops',
          targetRevision: 'main',
          ref: 'values',
        },
        {
          helm: {
            valueFiles: ['$values/test-pipeline-name/test-stage-name/test-app-name-values.yaml'],
            parameters: [
              { name: 'image.tag', value: 'test-image-tag' },
              {
                name: 'image.repository',
                value: 'test-registry/test-namespace/test-app-name',
              },
            ],
            releaseName: 'test-app-name',
          },
          path: 'deploy-templates',
          repoURL: 'ssh://git@github.com:111/test-namespace/test-app-name',
          targetRevision: 'test-image-tag',
        },
      ],
    },
  };
