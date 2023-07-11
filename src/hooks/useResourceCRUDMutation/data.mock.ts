export const mutationDataMock = {
    apiVersion: 'v1.edp.epam.com/v1',
    kind: 'EDPComponent',
    metadata: {
        creationTimestamp: '2023-05-16T13:17:33Z',
        name: 'tekton',
        namespace: 'test-namespace',
        resourceVersion: '959568212',
    },
    spec: {
        icon: 'test-icon',
        type: 'tekton',
        url: 'https://tekton-test-url.com',
        visible: true,
    },
};
