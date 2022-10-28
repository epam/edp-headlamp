import { ArgoApplicationKubeObjectInterface } from '../../../../../../../../../../../../../k8s/ArgoApplication/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const argoApplicationMock: DeepPartial<ArgoApplicationKubeObjectInterface> = {
    apiVersion: 'v1.edp.epam.com/v1alpha1',
    kind: 'ArgoApplication',
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
            repoURL: 'ssh://admin@gerrit.test-namespace:30005/test-app-name.git',
            targetRevision: 'test-image-tag',
        },
        syncPolicy: {
            syncOptions: ['CreateNamespace=true'],
            automated: { selfHeal: true, prune: true },
        },
    },
};
