import { EnrichedApplication } from '../../../../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const applicationMock: DeepPartial<EnrichedApplication> = {
    application: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        metadata: {
            creationTimestamp: '2022-10-25T19:53:12Z',
            finalizers: ['codebase.operator.finalizer.name', 'foregroundDeletion'],
            generation: 2,
            labels: {
                'app.edp.epam.com/codebaseType': 'application',
            },
            name: 'vp-test-jenkins',
            namespace: 'edp-delivery-vp-dev',
            resourceVersion: '340856597',
            uid: '5cb1562c-7455-486b-9dc1-f1ef7735bece',
        },
        spec: {
            buildTool: 'python',
            ciTool: 'jenkins',
            defaultBranch: 'master',
            deploymentScript: 'helm-chart',
            emptyProject: false,
            framework: 'python-3.8',
            gitServer: 'gerrit',
            jenkinsSlave: 'python-3.8',
            jiraIssueMetadataPayload: null,
            jobProvisioning: 'default',
            lang: 'Python',
            strategy: 'create',
            ticketNamePattern: null,
            type: 'application',
            versioning: {
                type: 'default',
            },
        },
        status: {
            action: 'setup_deployment_templates',
            available: true,
            failureCount: 0,
            git: 'templates_pushed',
            lastTimeUpdated: '2022-10-28T05:52:54Z',
            result: 'success',
            status: 'created',
            username: 'system',
            value: 'active',
        },
    },
    toPromote: true,
    applicationImageStreams: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                creationTimestamp: '2022-10-25T19:54:17Z',
                generation: 2,
                name: 'vp-test-jenkins-master',
                namespace: 'edp-delivery-vp-dev',
                resourceVersion: '326029843',
                uid: 'd63385db-ad8f-4291-9254-16ac415a993a',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName:
                    '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev/vp-test-jenkins',
                tags: [
                    {
                        created: '2022-10-25T19:57:04',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                creationTimestamp: '2022-10-25T19:59:27Z',
                generation: 2,
                name: 'vp-test-jenkins-pipe-qa-vp-test-jenkins-verified',
                namespace: 'edp-delivery-vp-dev',
                resourceVersion: '326098114',
                uid: 'c891ae0e-c529-4172-829f-d3ad4e13a658',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName: '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                tags: [
                    {
                        created: '2022-10-25T20:04:59',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                creationTimestamp: '2022-10-25T19:59:26Z',
                generation: 2,
                name: 'vp-test-jenkins-pipe-sit-vp-test-jenkins-verified',
                namespace: 'edp-delivery-vp-dev',
                resourceVersion: '326086111',
                uid: '9164d51e-aff4-4592-8175-7d9b1e05fb83',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName: '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                tags: [
                    {
                        created: '2022-10-25T20:03:36',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
    ],
};
