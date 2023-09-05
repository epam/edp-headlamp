import { DeepPartial } from '../../../../types/global';
import { ApplicationKubeObjectInterface } from '../../types';

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
                        value: '012345678910.dkr.ecr.eu-central-1.amazonaws.com/test-namespace/test-app-name',
                    },
                ],
            },
            path: 'deploy-templates',
            repoURL: 'ssh://git@github.com:22/test-namespace/test-app-name',
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
                    repoURL: 'ssh://git@github.com:22/test-namespace/test-app-name',
                    targetRevision: 'test-image-tag',
                    ref: 'values',
                },
                {
                    helm: {
                        valueFiles: [
                            '$values/test-pipeline-name/test-stage-name/test-app-name-values.yaml',
                        ],
                        parameters: [
                            { name: 'image.tag', value: 'test-image-tag' },
                            {
                                name: 'image.repository',
                                value: '012345678910.dkr.ecr.eu-central-1.amazonaws.com/test-namespace/test-app-name',
                            },
                        ],
                        releaseName: 'test-app-name',
                    },
                    path: 'deploy-templates',
                    repoURL: 'ssh://git@github.com:22/test-namespace/test-app-name',
                    targetRevision: 'test-image-tag',
                },
            ],
            syncPolicy: {
                syncOptions: ['CreateNamespace=true'],
                automated: { selfHeal: true, prune: true },
            },
        },
    };
