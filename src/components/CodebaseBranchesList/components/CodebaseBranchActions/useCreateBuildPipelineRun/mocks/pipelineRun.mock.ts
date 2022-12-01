import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';

export const pipelineRunMock: PipelineRunKubeObjectInterface = {
    apiVersion: 'tekton.dev/v1beta1',
    kind: 'PipelineRun',
    metadata: {
        namespace: 'test-namespace',
        name: 'test-codebase-name-build-8ygse',
        labels: {
            'app.edp.epam.com/codebasebranch': 'test-codebase-name-test-codebase-branch-name',
            'app.edp.epam.com/codebase': 'test-codebase-name',
            'app.edp.epam.com/pipelinetype': 'build',
        },
    },
    spec: {
        params: [
            {
                name: 'git-source-url',
                value: 'ssh://test-git-user@test-git-host:123/test-codebase-name',
            },
            {
                name: 'git-source-revision',
                value: 'test-codebase-branch-name',
            },
            {
                name: 'CODEBASEBRANCH_NAME',
                value: 'test-codebase-name-test-codebase-branch-name',
            },
            { name: 'CODEBASE_NAME', value: 'test-codebase-name' },
            { name: 'changeNumber', value: '1' },
            { name: 'patchsetNumber', value: '1' },
        ],
        pipelineRef: {
            name: 'test-git-provider-test-build-tool-test-framework-tes-build-test-versioning-type',
        },
        serviceAccountName: 'tekton',
        taskRunSpecs: [
            {
                pipelineTaskName: 'create-ecr-repository',
                taskServiceAccountName: 'edp-kaniko',
            },
            {
                pipelineTaskName: 'kaniko-build',
                taskServiceAccountName: 'edp-kaniko',
            },
        ],
        timeout: '1h0m0s',
        workspaces: [
            {
                name: 'settings',
                configMap: { name: 'custom-test-build-tool-settings' },
            },
            {
                name: 'shared-workspace',
                subPath: 'codebase',
                volumeClaimTemplate: {
                    metadata: { creationTimestamp: null },
                    spec: {
                        accessModes: ['ReadWriteOnce'],
                        resources: { requests: { storage: '1Gi' } },
                    },
                    status: {},
                },
            },
            {
                name: 'ssh-creds',
                secret: { secretName: 'test-ssh-key-secret' },
            },
        ],
    },
};
