import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

export const groovyLibrariesMock: DeepPartial<EDPCodebaseKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                labels: {
                    'app.edp.epam.com/codebaseType': 'library',
                },
                name: 'test-groovy',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                buildTool: 'Codenarc',
                ciTool: 'Jenkins',
                defaultBranch: 'master',
                emptyProject: false,
                framework: 'codenarc',
                gitServer: 'gerrit',
                jenkinsSlave: 'codenarc',
                jiraIssueMetadataPayload: null,
                jobProvisioning: 'default',
                lang: 'groovy-pipeline',
                strategy: 'create',
                ticketNamePattern: null,
                type: 'library',
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
                    'app.edp.epam.com/codebaseType': 'library',
                },
                name: 'test-lib',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                buildTool: 'codenarc',
                ciTool: 'jenkins',
                defaultBranch: 'master',
                deploymentScript: 'helm-chart',
                emptyProject: false,
                framework: 'codenarc',
                gitServer: 'gerrit',
                jenkinsSlave: 'codenarc',
                jiraIssueMetadataPayload: null,
                jobProvisioning: 'default',
                lang: 'groovy-pipeline',
                strategy: 'create',
                ticketNamePattern: null,
                type: 'library',
                versioning: {
                    startFrom: '0.0.0-SNAPSHOT',
                    type: 'edp',
                },
            },
        },
    ],
};
