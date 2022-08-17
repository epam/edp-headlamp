import { EDPCodebaseKubeObjectInterface } from '../../../../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../../../../types/global';

export const libraryImportStrategyEditorPropsObjectMock: DeepPartial<EDPCodebaseKubeObjectInterface> =
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
            type: 'library',
            strategy: 'import',
            gitServer: 'gerrit',
            ciTool: 'jenkins',
            emptyProject: false,
            jenkinsSlave: 'maven-java11',
            defaultBranch: 'master',
            lang: 'Java',
            framework: 'java11',
            buildTool: 'maven',
            jobProvisioning: 'default',
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
            gitUrlPath: 'https://git.epam.com/epmd-edp/examples/3tier/3-tier-app-be.git',
        },
        metadata: {
            name: 'test',
            namespace: 'edp-delivery-vp-delivery-dev',
        },
    };

export const libraryImportStrategyEditorPropsObjectMockExpectedOutput = {
    type: 'library',
    strategy: 'import',
    gitServer: 'gerrit',
    ciTool: 'jenkins',
    emptyProject: false,
    jenkinsSlave: 'maven-java11',
    defaultBranch: 'master',
    lang: 'Java',
    framework: 'java11',
    buildTool: 'maven',
    jobProvisioning: 'default',
    versioningType: 'edp',
    versioningStartFrom: '0.0.0-SNAPSHOT',
    deploymentScript: 'helm-chart',
    jiraServer: 'epam-jira',
    commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
    ticketNamePattern: 'PROJECT_NAME-\\d{4}',
    jiraIssueMetadataPayload: '{"components":"test1","fixVersions":"test2","labels":"test3"}',
    gitUrlPath: 'https://git.epam.com/epmd-edp/examples/3tier/3-tier-app-be.git',
    name: 'test',
    namespace: 'edp-delivery-vp-delivery-dev',
};
