import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../../k8s/Application/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const applicationMock: DeepPartial<ApplicationKubeObjectInterface> = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
    metadata: {
        name: `test-app-name-8ygse`,
        namespace: 'test-namespace',
        labels: {
            'app.edp.epam.com/stage': `test-stage-name`,
            'app.edp.epam.com/pipeline': `test-pipeline-name`,
            'app.edp.epam.com/app-name': 'test-app-name',
        },
        finalizers: ['resources-finalizer.argocd.argoproj.io'],
        ownerReferences: [
            {
                apiVersion: 'v2.edp.epam.com/v1',
                blockOwnerDeletion: true,
                controller: true,
                kind: 'Stage',
                name: 'test-pipeline-name-test-stage-name',
                uid: '84dfeba1-bc42-4d1b-ab1f-473ebdf0fdf3',
            },
        ],
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
