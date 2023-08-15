import { EDPCodebaseImageStreamKubeObjectInterface } from '../types';

export const codebaseImageStreamsWithTagsMock: {
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    verifiedImageStream: EDPCodebaseImageStreamKubeObjectInterface;
} = {
    // @ts-ignore
    imageStream: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'CodebaseImageStream',
        metadata: {
            name: 'test-codebase-main',
            namespace: 'test-namespace',
            resourceVersion: '1107187134',
            uid: 'f9bb067f-82c6-4b1a-a315-ff6e2dc62a98',
            creationTimestamp: '2021-07-31T09:51:11Z',
        },
        spec: {
            codebase: 'test-codebase',
            imageName: 'imageName',
            tags: [
                {
                    created: '2023-07-31T09:51:11Z',
                    name: 'main-0.1.0-20230731-094439',
                },
                {
                    created: '2023-07-31T13:42:16Z',
                    name: 'main-0.1.0-20230731-133849',
                },
                {
                    created: '2023-07-31T13:51:32Z',
                    name: 'main-0.1.0-20230731-134738',
                },
                {
                    created: '2023-07-31T14:35:31Z',
                    name: 'main-0.1.0-20230731-143228',
                },
            ],
        },
    },
    // @ts-ignore
    verifiedImageStream: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'CodebaseImageStream',
        metadata: {
            name: 'test-pipeline-sit-test-codebase-verified',
            namespace: 'test-namespace',
            resourceVersion: '1107187134',
            uid: 'f9bb067f-82c6-4b1a-a315-ff6e2dc62a98',
            creationTimestamp: '2021-07-31T09:51:11Z',
        },
        spec: {
            codebase: 'test-codebase',
            imageName: 'imageName',
            tags: [
                {
                    created: '2023-07-31T14:35:31Z',
                    name: 'main-0.1.0-20230731-143228',
                },
            ],
        },
    },
};
