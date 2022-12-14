import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

export const autotestCloneStrategyEditorPropsObjectMock: DeepPartial<EDPCodebaseKubeObjectInterface> =
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
            type: 'autotests',
            strategy: 'clone',
            gitServer: 'gerrit',
            ciTool: 'jenkins',
            jenkinsSlave: 'maven-java11',
            repository: {
                url: 'https://github.com/kinvolk/headlamp.git',
            },
            defaultBranch: 'master',
            description: 'autotest description',
            lang: 'Java',
            framework: 'java11',
            buildTool: 'maven',
            testReportFramework: 'allure',
            jobProvisioning: 'default',
            versioning: {
                type: 'edp',
                startFrom: '0.0.0-SNAPSHOT',
            },
            jiraServer: 'epam-jira',
            commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
            ticketNamePattern: 'PROJECT_NAME-\\d{4}',
            jiraIssueMetadataPayload:
                '{"components":"test1","fixVersions":"test2","labels":"test3"}',
        },
        metadata: {
            name: 'test',
        },
    };

export const autotestCloneStrategyEditorPropsObjectMockExpectedOutput = {
    type: 'autotests',
    strategy: 'clone',
    gitServer: 'gerrit',
    ciTool: 'jenkins',
    jenkinsSlave: 'maven-java11',
    repositoryUrl: 'https://github.com/kinvolk/headlamp.git',
    defaultBranch: 'master',
    description: 'autotest description',
    lang: 'Java',
    framework: 'java11',
    buildTool: 'maven',
    testReportFramework: 'allure',
    jobProvisioning: 'default',
    versioningType: 'edp',
    versioningStartFrom: '0.0.0-SNAPSHOT',
    jiraServer: 'epam-jira',
    commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
    ticketNamePattern: 'PROJECT_NAME-\\d{4}',
    jiraIssueMetadataPayload: '{"components":"test1","fixVersions":"test2","labels":"test3"}',
    name: 'test',
};
