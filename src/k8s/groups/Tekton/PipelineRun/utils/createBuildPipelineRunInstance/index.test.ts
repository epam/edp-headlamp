/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { createBuildPipelineRunInstance } from './index';

beforeEach(() => {
  jest
    .spyOn(global.window.crypto, 'getRandomValues')
    .mockReturnValue(new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584]));
});

afterEach(() => {
  jest.clearAllMocks();
  jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createBuildPipelineRunInstance', () => {
  it('should return valid kube object', () => {
    const object = createBuildPipelineRunInstance({
      namespace: 'test-namespace',
      codebase: {
        metadata: { name: 'test-codebase-name' },
        spec: {
          buildTool: 'test-build-tool',
          type: 'application',
          framework: 'test-framework',
          gitUrlPath: '/test-git-url-path',
          versioning: {
            type: 'test-versioning-type',
          },
        },
      } as CodebaseKubeObjectInterface,
      codebaseBranch: {
        metadata: {
          name: 'test-codebase-name-test-codebase-branch-name',
        },
        spec: {
          branchName: 'test-codebase-branch-name',
          pipelines: {
            build: 'test-build-pipeline',
            review: 'test-review-pipeline',
          },
        },
      } as CodebaseBranchKubeObjectInterface,
      gitServer: {
        spec: {
          gitHost: 'test-git-host',
          gitUser: 'test-git-user',
          sshPort: 123,
          nameSshKeySecret: 'test-ssh-key-secret',
          gitProvider: 'test-git-provider',
        },
      } as GitServerKubeObjectInterface,
      storageSize: '1Gi',
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        namespace: 'test-namespace',
        name: 'test-codebase-name-test-codebase--build-8ygse',
        labels: {
          'app.edp.epam.com/codebasebranch': 'test-codebase-name-test-codebase-branch-name',
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/pipelinetype': 'build',
        },
        annotations: {
          'argocd.argoproj.io/compare-options': 'IgnoreExtraneous',
        },
      },
      spec: {
        params: [
          {
            name: 'git-source-url',
            value: 'ssh://test-git-user@test-git-host:123/test-git-url-path',
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
        ],
        pipelineRef: {
          name: 'test-build-pipeline',
        },
        taskRunTemplate: {
          serviceAccountName: 'tekton',
        },
        timeouts: {
          pipeline: '1h0m0s',
        },
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
