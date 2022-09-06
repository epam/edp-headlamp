export const codebaseBranchesMock = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            metadata: {
                labels: {
                    'app.edp.epam.com/codebaseName': 'test-autotest',
                },
                name: 'test-autotest-master',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                branchName: 'master',
                codebaseName: 'test-autotest',
                fromCommit: '',
                release: false,
            },
        },
    ],
};
