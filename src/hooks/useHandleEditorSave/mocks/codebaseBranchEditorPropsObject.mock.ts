export const codebaseBranchEditorPropsObjectMock = [
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'CodebaseBranch',
        spec: {
            codebaseName: 'test-java-app',
            branchName: 'develop',
            fromCommit: '',
            release: false,
        },
        metadata: {
            name: 'test-java-app-develops',
            labels: {
                'app.edp.epam.com/codebaseName': 'test-java-app',
            },
        },
    },
];

export const codebaseBranchEditorPropsObjectMockExpectedOutput = {
    codebaseName: 'test-java-app',
    branchName: 'develop',
    fromCommit: '',
    release: false,
    name: 'test-java-app-develops',
    codebaseNameLabel: 'test-java-app',
};
