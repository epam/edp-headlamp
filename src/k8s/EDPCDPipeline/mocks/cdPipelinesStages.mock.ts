export const emptyCDPipelinesStagesListMock = {
    items: [],
};

export const CDPipelinesStagesListMock = {
    items: [
        {
            kind: 'Stage',
            spec: {
                source: {
                    library: {
                        name: 'test-library-name',
                    },
                },
                cdPipeline: 'test-cdpipeline-name',
                qualityGates: [
                    { autotestName: 'test-autotest-name', branchName: 'test-autotest-branch-name' },
                ],
            },
        },
    ],
};
