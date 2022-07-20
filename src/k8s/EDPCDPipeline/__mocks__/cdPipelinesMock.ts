export const emptyCDPipelinesListMock = {
    items: [],
};

export const CDPipelinesListMock = {
    items: [
        {
            kind: 'CDPipeline',
            spec: {
                name: 'test-cdpipeline-name',
                applications: ['test-application'],
                inputDockerStreams: ['test-application-branch'],
            },
        },
    ],
};
