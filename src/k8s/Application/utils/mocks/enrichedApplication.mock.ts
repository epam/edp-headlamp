export const enrichedApplicationMock = {
    application: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        metadata: {
            name: 'test-app-name',
            namespace: 'test-namespace',
        },
        spec: {
            gitServer: 'github',
            gitUrlPath: '/test-namespace/test-app-name',
            type: 'application',
            versioning: {
                type: 'default',
            },
        },
    },
    argoApplication: {
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
            destination: {
                name: 'in-cluster',
                namespace: 'test-namespace-demo-sit',
            },
            project: 'test-namespace',
            sources: [
                {
                    ref: 'values',
                    repoURL: 'ssh://git@git.epam.com:22/epmd-edp/sk-dev/edp-gitops',
                    targetRevision: 'main',
                },
                {
                    helm: {
                        parameters: [
                            {
                                name: 'image.tag',
                                value: '0.1.0-SNAPSHOT.3',
                            },
                            {
                                name: 'image.repository',
                                value: 'registry.eks-sandbox.aws.main.edp.projects.epam.com/test-namespace/test-app-name',
                            },
                        ],
                        releaseName: 'test-app-name',
                        valueFiles: ['$values/demo/sit/test-app-name-values.yaml'],
                    },
                    path: 'deploy-templates',
                    repoURL: 'ssh://git@git.epam.com:22/epmd-edp/sk-dev/test-app-name',
                    targetRevision: 'build/0.1.0-SNAPSHOT.1',
                },
            ],
            syncPolicy: {
                automated: {
                    prune: true,
                    selfHeal: true,
                },
                syncOptions: ['CreateNamespace=true'],
            },
        },
    },
    applicationImageStream: 'test-app-name-master',
    toPromote: true,
    applicationImageStreams: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'test-app-name-master',
                namespace: 'test-namespace',
            },
            spec: {
                codebase: 'test-app-name',
                imageName:
                    '01234567890.dkr.ecr.eu-central-1.amazonaws.com/test-namespace/test-app-name',
                tags: [
                    {
                        created: "2023-01-10'T'12:49:28",
                        name: 'master-0.0.1-SNAPSHOT-20230110-124530',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                creationTimestamp: '2023-01-10T13:08:59Z',
                generation: 1,
                managedFields: [
                    {
                        apiVersion: 'v2.edp.epam.com/v1',
                        fieldsType: 'FieldsV1',
                        fieldsV1: {
                            'f:spec': {
                                '.': {},
                                'f:codebase': {},
                                'f:imageName': {},
                            },
                        },
                        manager: 'cd-pipeline-operator',
                        operation: 'Update',
                        time: '2023-01-10T13:08:59Z',
                    },
                ],
                name: 'mm-test-dev-test-app-name-verified',
                namespace: 'test-namespace',
                resourceVersion: '650269748',
                uid: 'e321646f-e814-413d-b636-534a14525448',
            },
            spec: {
                codebase: 'test-app-name',
                imageName:
                    '01234567890.dkr.ecr.eu-central-1.amazonaws.com/test-namespace/test-app-name',
            },
        },
    ],
};
