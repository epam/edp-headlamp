import { EDPCodebaseKubeObjectInterface } from '../../../../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../../../../types/global';

export const applicationCreateStrategyEditorPropsObjectMock: DeepPartial<EDPCodebaseKubeObjectInterface> =
    {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
            type: 'application',
            strategy: 'create',
            gitServer: 'gerrit',
            ciTool: 'jenkins',
            emptyProject: false,
            jenkinsSlave: 'gradle-java11',
            defaultBranch: 'master',
            lang: 'Java',
            framework: 'java11',
            buildTool: 'gradle',
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

export const applicationCreateStrategyEditorPropsObjectMockExpectedOutput = {
    type: 'application',
    strategy: 'create',
    gitServer: 'gerrit',
    ciTool: 'jenkins',
    emptyProject: false,
    jenkinsSlave: 'gradle-java11',
    defaultBranch: 'master',
    lang: 'Java',
    framework: 'java11',
    buildTool: 'gradle',
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
