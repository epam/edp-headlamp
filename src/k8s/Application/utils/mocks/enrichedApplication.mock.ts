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
