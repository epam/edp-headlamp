export const gitOpsCodebaseMock = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Codebase',
    metadata: {
        labels: {
            'app.edp.epam.com/codebaseType': 'system',
        },
        name: 'edp-gitops',
        namespace: 'edp-delivery-vp-dev',
    },
    spec: {
        buildTool: 'helm',
        ciTool: 'tekton',
        defaultBranch: 'main',
        deploymentScript: 'helm-chart',
        description: 'Custom values for deploy applications',
        emptyProject: false,
        framework: 'gitops',
        gitServer: 'gerrit',
        gitUrlPath: '/edp-gitops',
        jiraIssueMetadataPayload: null,
        lang: 'helm',
        strategy: 'create',
        ticketNamePattern: null,
        type: 'system',
        versioning: {
            startFrom: '0.1.0-SNAPSHOT',
            type: 'edp',
        },
    },
};
