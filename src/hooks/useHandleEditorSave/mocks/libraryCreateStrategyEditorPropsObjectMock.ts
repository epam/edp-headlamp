import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

export const libraryCreateStrategyEditorPropsObjectMock: DeepPartial<EDPCodebaseKubeObjectInterface> =
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
            type: 'library',
            strategy: 'create',
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
        },
        metadata: {
            name: 'test',
            namespace: 'edp-delivery-vp-delivery-dev',
        },
    };

export const libraryCreateStrategyEditorPropsObjectMockExpectedOutput = {
    type: 'library',
    strategy: 'create',
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
    name: 'test',
    namespace: 'edp-delivery-vp-delivery-dev',
};
