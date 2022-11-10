import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../../k8s/Application/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const applicationMock: DeepPartial<ApplicationKubeObjectInterface> = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
        name: `test-pipeline-name-test-stage-name-test-app-name-4fzzz`,
        namespace: 'test-namespace',
    },
    spec: {
        project: 'test-namespace',
        destination: {
            namespace: 'test-namespace-test-pipeline-name-test-stage-name',
            server: 'https://kubernetes.default.svc',
        },
        source: {
            helm: {
                parameters: [
                    { name: 'image.tag', value: 'test-image-tag' },
                    { name: 'image.repository', value: 'test-image-name' },
                ],
            },
            path: 'deploy-templates',
            repoURL: 'ssh://argocd@gerrit.test-namespace:30005/test-app-name.git',
            targetRevision: 'test-image-tag',
        },
        syncPolicy: {
            syncOptions: ['CreateNamespace=true'],
            automated: { selfHeal: true, prune: true },
        },
    },
};
