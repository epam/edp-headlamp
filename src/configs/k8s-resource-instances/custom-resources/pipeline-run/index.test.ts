/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { createPipelineRunInstance } from './index';

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createPipelineRunInstance', () => {
    it('should return valid kube object', () => {
        const randomPostfix = createRandomFiveSymbolString();

        const object = createPipelineRunInstance({
            namespace: 'test-namespace',
            codebaseData: {
                codebaseName: 'test-codebase-name',
                codebaseBuildTool: 'test-build-tool',
                codebaseVersioningType: 'test-versioning-type',
                codebaseType: 'test-codebase-type',
                codebaseFramework: 'test-framework',
            },
            codebaseBranchData: {
                codebaseBranchMetadataName: 'test-codebase-name-test-codebase-branch-name',
                codebaseBranchName: 'test-codebase-branch-name',
            },
            gitServerData: {
                gitHost: 'test-git-host',
                gitUser: 'test-git-user',
                gitProvider: 'test-git-provider',
                sshPort: 123,
                nameSshKeySecret: 'test-ssh-key-secret',
            },
            randomPostfix,
        });

        expect(object).toEqual({
            apiVersion: 'tekton.dev/v1beta1',
            kind: 'PipelineRun',
            metadata: {
                namespace: 'test-namespace',
                name: 'test-codebase-name-build-8ygse',
                labels: {
                    'app.edp.epam.com/codebasebranch':
                        'test-codebase-name-test-codebase-branch-name',
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
        });
    });
});
