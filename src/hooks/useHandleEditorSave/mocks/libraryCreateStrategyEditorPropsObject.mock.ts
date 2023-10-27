export const libraryCreateStrategyEditorPropsObjectMock = [
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
            type: 'library',
            strategy: 'create',
            gitServer: 'gerrit',
            ciTool: 'tekton',
            emptyProject: false,
            defaultBranch: 'master',
            lang: 'Java',
            framework: 'java11',
            buildTool: 'maven',
            versioning: {
                type: 'edp',
                startFrom: '0.0.0-SNAPSHOT',
            },
            deploymentScript: 'helm-chart',
            jiraServer: 'epam-jira',
            commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
            ticketNamePattern: 'PROJECT_NAME-\\d{4}',
            jiraIssueMetadataPayload:
                '{"components":"test1","fixVersions":"test2","labels":"test3"}',
        },
        metadata: {
            name: 'test',
        },
    },
];

export const libraryCreateStrategyEditorPropsObjectMockExpectedOutput = {
    type: 'library',
    strategy: 'create',
    gitServer: 'gerrit',
    ciTool: 'tekton',
    emptyProject: false,
    defaultBranch: 'master',
    lang: 'Java',
    framework: 'java11',
    buildTool: 'maven',
    versioningType: 'edp',
    versioningStartFrom: '0.0.0-SNAPSHOT',
    deploymentScript: 'helm-chart',
    jiraServer: 'epam-jira',
    commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
    ticketNamePattern: 'PROJECT_NAME-\\d{4}',
    jiraIssueMetadataPayload: '{"components":"test1","fixVersions":"test2","labels":"test3"}',
    name: 'test',
};
