export const codebasesMock = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                labels: {
                    'app.edp.epam.com/codebaseType': 'autotest',
                },
                name: 'autotest-autotest',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                buildTool: 'gradle',
                ciTool: 'jenkins',
                defaultBranch: 'master',
                description: 'autotest-autotest description',
                emptyProject: false,
                framework: 'java11',
                gitServer: 'gerrit',
                jenkinsSlave: 'gradle-java11',
                jiraIssueMetadataPayload: null,
                jobProvisioning: 'default',
                lang: 'Java',
                repository: {
                    url: 'https://github.com/kinvolk/headlamp.git',
                },
                strategy: 'clone',
                testReportFramework: 'allure',
                ticketNamePattern: null,
                type: 'autotest',
                versioning: {
                    type: 'default',
                },
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                labels: {
                    'app.edp.epam.com/codebaseType': 'autotest',
                },
                name: 'test-autotest',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                buildTool: 'Maven',
                ciTool: 'Jenkins',
                commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
                defaultBranch: 'master',
                description: 'autotest description',
                emptyProject: false,
                framework: 'java11',
                gitServer: 'gerrit',
                jenkinsSlave: 'maven-java11',
                jiraIssueMetadataPayload: '{"fixVersions":"EDP_VERSION-EDP_COMPONENT"}',
                jiraServer: 'epam-jira',
                jobProvisioning: 'default',
                lang: 'Java',
                repository: {
                    url: 'https://github.com/kinvolk/headlamp.git',
                },
                strategy: 'clone',
                testReportFramework: 'allure',
                ticketNamePattern: 'PROJECT_NAME-\\d{4}',
                type: 'autotest',
                versioning: {
                    type: 'default',
                },
            },
        },
    ],
};
