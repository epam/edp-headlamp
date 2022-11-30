import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../../k8s/Application/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const applicationMock: DeepPartial<ApplicationKubeObjectInterface> = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
        name: `test-pipeline-name-test-stage-name-test-app-name`,
        namespace: 'test-namespace',
        labels: {
            'app.edp.epam.com/pipeline-stage': `test-pipeline-name-test-stage-name`,
            'app.edp.epam.com/pipeline': `test-pipeline-name`,
            'app.edp.epam.com/app-name': 'test-app-name',
        },
        finalizers: ['resources-finalizer.argocd.argoproj.io'],
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
            targetRevision: 'build/test-image-tag',
        },
        syncPolicy: {
            syncOptions: ['CreateNamespace=true'],
            automated: { selfHeal: true, prune: true },
        },
    },
};
