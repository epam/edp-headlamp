import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../../types/global';

export const createStrategyCodebaseDataMock: DeepPartial<EDPCodebaseKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Codebase',
    spec: {
        type: 'application',
        strategy: 'create',
        gitServer: 'gerrit',
        ciTool: 'jenkins',
        emptyProject: false,
        versioning: {
            type: 'edp',
            startFrom: '0.0.0-SNAPSHOT',
        },
        defaultBranch: 'master',
        framework: 'java8',
        buildTool: 'maven',
        lang: 'Java',
        jenkinsSlave: 'maven-java8',
        jobProvisioning: 'default',
        deploymentScript: 'helm-chart',
        jiraServer: 'epam-jira',
        jiraIssueMetadataPayload:
            '{"components":"EDP_COMPONENT","fixVersions":"EDP_SEM_VERSION-EDP_COMPONENT"}',
        commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
        ticketNamePattern: 'PROJECT_NAME-\\d{4}',
    },
    metadata: {
        name: 'app-test',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
};
