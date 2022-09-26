export const codebaseBranchesMock = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            metadata: {
                name: 'test-application-develop',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                branchName: 'develop',
                codebaseName: 'test-application',
                fromCommit: '',
                release: false,
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            metadata: {
                name: 'test-application-master',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                branchName: 'master',
                codebaseName: 'test-application',
                fromCommit: '',
                release: false,
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            metadata: {
                name: 'test-application-test-branch',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                branchName: 'test-branch',
                codebaseName: 'test-application',
                fromCommit: '',
                release: false,
            },
        },
    ],
};
