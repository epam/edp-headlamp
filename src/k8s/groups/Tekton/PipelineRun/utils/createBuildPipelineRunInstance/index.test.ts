import { v4 as uuidv4 } from 'uuid';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { PipelineRunKubeObjectInterface } from '../../types';
import { createBuildPipelineRunInstance } from './index';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const MOCKED_UUID = '1234';
(uuidv4 as jest.Mock).mockReturnValue(MOCKED_UUID);

const mockCodebase = {
  metadata: { name: 'test-codebase-name' },
  spec: {
    buildTool: 'test-build-tool',
    type: 'application',
    framework: 'test-framework',
    gitUrlPath: '/test-git-url-path',
    versioning: {
      type: 'test-versioning-type',
    },
    gitServer: 'gerrit',
  },
} as CodebaseKubeObjectInterface;

const mockCodebaseBranch = {
  metadata: {
    name: 'test-codebase-name-test-codebase-branch-name-very-long-long-name',
  },
  spec: {
    branchName: 'test-codebase-branch-name',
    pipelines: {
      build: 'test-build-pipeline',
      review: 'test-review-pipeline',
    },
  },
} as CodebaseBranchKubeObjectInterface;

const mockPipelineRunTemplate = {
  apiVersion: 'tekton.dev/v1',
  kind: 'PipelineRun',
  // @ts-ignore
  metadata: {
    annotations: {
      'argocd.argoproj.io/compare-options': 'IgnoreExtraneous',
    },
    generateName: '$(tt.params.codebasebranch)-build-',
    labels: {
      'app.edp.epam.com/codebase': '$(tt.params.codebase)',
      'app.edp.epam.com/codebasebranch': '$(tt.params.codebasebranch)',
      'app.edp.epam.com/pipelinetype': 'build',
    },
  },
  spec: {
    params: [
      {
        name: 'git-source-url',
        value: 'ssh://git-user@gitProvider:777/$(tt.params.gerritproject)',
      },
      {
        name: 'git-source-revision',
        value: '$(tt.params.gitrevision)',
      },
      {
        name: 'CODEBASE_NAME',
        value: '$(tt.params.codebase)',
      },
      {
        name: 'CODEBASEBRANCH_NAME',
        value: '$(tt.params.codebasebranch)',
      },
      {
        name: 'changeNumber',
        value: '$(tt.params.changeNumber)',
      },
      {
        name: 'patchsetNumber',
        value: '$(tt.params.patchsetNumber)',
      },
      {
        name: 'TICKET_NAME_PATTERN',
        value: '$(tt.params.ticketNamePattern)',
      },
      {
        name: 'COMMIT_MESSAGE_PATTERN',
        value: '$(tt.params.commitMessagePattern)',
      },
      {
        name: 'COMMIT_MESSAGE',
        value: '$(tt.params.commitMessage)',
      },
      {
        name: 'JIRA_ISSUE_METADATA_PAYLOAD',
        value: '$(tt.params.jiraIssueMetadataPayload)',
      },
      {
        name: 'JIRA_SERVER',
        value: '$(tt.params.jiraServer)',
      },
      {
        name: 'gitfullrepositoryname',
        value: '$(tt.params.gitfullrepositoryname)',
      },
    ],
    pipelineRef: {
      name: '$(tt.params.pipelineName)',
    },
    taskRunTemplate: {
      serviceAccountName: 'tekton',
    },
    workspaces: [
      {
        name: 'shared-workspace',
        subPath: 'codebase',
        volumeClaimTemplate: {
          spec: {
            accessModes: ['ReadWriteOnce'],
            resources: {
              requests: {
                storage: '5Gi',
              },
            },
          },
        },
      },
      {
        name: 'ssh-creds',
        secret: {
          secretName: 'secretName',
        },
      },
    ],
  },
} as unknown as PipelineRunKubeObjectInterface;

describe('testing createBuildPipelineRunInstance', () => {
  it('should return valid build pipelinerun for Gerrit GitServer', () => {
    const object = createBuildPipelineRunInstance({
      codebase: mockCodebase,
      codebaseBranch: mockCodebaseBranch,
      pipelineRunTemplate: mockPipelineRunTemplate,
      gitServer: {
        spec: {
          gitHost: 'test-git-host',
          gitUser: 'test-git-user',
          sshPort: 123,
        },
      } as GitServerKubeObjectInterface,
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        name: `build-test-codebase-name-test-codebase-branch-name-very-lo-${MOCKED_UUID}`,
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch':
            'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          'app.edp.epam.com/pipelinetype': 'build',
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
          { name: 'CODEBASE_NAME', value: 'test-codebase-name' },
          {
            name: 'CODEBASEBRANCH_NAME',
            value: 'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          },
          { name: 'changeNumber', value: '1' },
          { name: 'patchsetNumber', value: '1' },
          { name: 'TICKET_NAME_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE', value: '' },
          { name: 'JIRA_ISSUE_METADATA_PAYLOAD', value: '' },
          { name: 'JIRA_SERVER', value: '' },
          { name: 'gitfullrepositoryname', value: 'test-git-url-path' },
        ],
        pipelineRef: { name: 'test-build-pipeline' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        workspaces: [
          {
            name: 'shared-workspace',
            subPath: 'codebase',
            volumeClaimTemplate: {
              spec: {
                accessModes: ['ReadWriteOnce'],
                resources: { requests: { storage: '5Gi' } },
              },
            },
          },
          { name: 'ssh-creds', secret: { secretName: 'secretName' } },
          {
            name: 'settings',
            configMap: { name: 'custom-test-build-tool-settings' },
          },
        ],
      },
    });
  });

  it('should return valid build pipelinerun for Github GitServer', () => {
    const object = createBuildPipelineRunInstance({
      codebase: mockCodebase,
      codebaseBranch: mockCodebaseBranch,
      pipelineRunTemplate: mockPipelineRunTemplate,
      gitServer: {
        spec: {
          gitHost: 'github.com',
          gitUser: 'git',
          sshPort: 22,
        },
      } as GitServerKubeObjectInterface,
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch':
            'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          'app.edp.epam.com/pipelinetype': 'build',
        },
        name: `build-test-codebase-name-test-codebase-branch-name-very-lo-${MOCKED_UUID}`,
      },
      spec: {
        params: [
          {
            name: 'git-source-url',
            value: 'ssh://git@github.com:22/test-git-url-path',
          },
          {
            name: 'git-source-revision',
            value: 'test-codebase-branch-name',
          },
          { name: 'CODEBASE_NAME', value: 'test-codebase-name' },
          {
            name: 'CODEBASEBRANCH_NAME',
            value: 'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          },
          { name: 'changeNumber', value: '1' },
          { name: 'patchsetNumber', value: '1' },
          { name: 'TICKET_NAME_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE', value: '' },
          { name: 'JIRA_ISSUE_METADATA_PAYLOAD', value: '' },
          { name: 'JIRA_SERVER', value: '' },
          { name: 'gitfullrepositoryname', value: 'test-git-url-path' },
        ],
        pipelineRef: { name: 'test-build-pipeline' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        workspaces: [
          {
            name: 'shared-workspace',
            subPath: 'codebase',
            volumeClaimTemplate: {
              spec: {
                accessModes: ['ReadWriteOnce'],
                resources: { requests: { storage: '5Gi' } },
              },
            },
          },
          { name: 'ssh-creds', secret: { secretName: 'secretName' } },
          {
            name: 'settings',
            configMap: { name: 'custom-test-build-tool-settings' },
          },
        ],
      },
    });
  });

  it('should return valid build pipelinerun for Gitlab GitServer', () => {
    const object = createBuildPipelineRunInstance({
      codebase: mockCodebase,
      codebaseBranch: mockCodebaseBranch,
      pipelineRunTemplate: mockPipelineRunTemplate,
      gitServer: {
        spec: {
          gitHost: 'git.epam.com',
          gitUser: 'git',
          sshPort: 22,
        },
      } as GitServerKubeObjectInterface,
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch':
            'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          'app.edp.epam.com/pipelinetype': 'build',
        },
        name: `build-test-codebase-name-test-codebase-branch-name-very-lo-${MOCKED_UUID}`,
      },
      spec: {
        params: [
          {
            name: 'git-source-url',
            value: 'ssh://git@git.epam.com:22/test-git-url-path',
          },
          {
            name: 'git-source-revision',
            value: 'test-codebase-branch-name',
          },
          { name: 'CODEBASE_NAME', value: 'test-codebase-name' },
          {
            name: 'CODEBASEBRANCH_NAME',
            value: 'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          },
          { name: 'changeNumber', value: '1' },
          { name: 'patchsetNumber', value: '1' },
          { name: 'TICKET_NAME_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE', value: '' },
          { name: 'JIRA_ISSUE_METADATA_PAYLOAD', value: '' },
          { name: 'JIRA_SERVER', value: '' },
          { name: 'gitfullrepositoryname', value: 'test-git-url-path' },
        ],
        pipelineRef: { name: 'test-build-pipeline' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        workspaces: [
          {
            name: 'shared-workspace',
            subPath: 'codebase',
            volumeClaimTemplate: {
              spec: {
                accessModes: ['ReadWriteOnce'],
                resources: { requests: { storage: '5Gi' } },
              },
            },
          },
          { name: 'ssh-creds', secret: { secretName: 'secretName' } },
          {
            name: 'settings',
            configMap: { name: 'custom-test-build-tool-settings' },
          },
        ],
      },
    });
  });

  it('should return valid build pipelinerun for Bitbucket GitServer', () => {
    const object = createBuildPipelineRunInstance({
      codebase: mockCodebase,
      codebaseBranch: mockCodebaseBranch,
      pipelineRunTemplate: mockPipelineRunTemplate,
      gitServer: {
        spec: {
          gitHost: 'bitbucket.org',
          gitUser: 'git',
          sshPort: 22,
        },
      } as GitServerKubeObjectInterface,
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch':
            'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          'app.edp.epam.com/pipelinetype': 'build',
        },
        name: `build-test-codebase-name-test-codebase-branch-name-very-lo-${MOCKED_UUID}`,
      },
      spec: {
        params: [
          {
            name: 'git-source-url',
            value: 'ssh://git@bitbucket.org:22/test-git-url-path',
          },
          {
            name: 'git-source-revision',
            value: 'test-codebase-branch-name',
          },
          { name: 'CODEBASE_NAME', value: 'test-codebase-name' },
          {
            name: 'CODEBASEBRANCH_NAME',
            value: 'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          },
          { name: 'changeNumber', value: '1' },
          { name: 'patchsetNumber', value: '1' },
          { name: 'TICKET_NAME_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE', value: '' },
          { name: 'JIRA_ISSUE_METADATA_PAYLOAD', value: '' },
          { name: 'JIRA_SERVER', value: '' },
          { name: 'gitfullrepositoryname', value: 'test-git-url-path' },
        ],
        pipelineRef: { name: 'test-build-pipeline' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        workspaces: [
          {
            name: 'shared-workspace',
            subPath: 'codebase',
            volumeClaimTemplate: {
              spec: {
                accessModes: ['ReadWriteOnce'],
                resources: { requests: { storage: '5Gi' } },
              },
            },
          },
          { name: 'ssh-creds', secret: { secretName: 'secretName' } },
          {
            name: 'settings',
            configMap: { name: 'custom-test-build-tool-settings' },
          },
        ],
      },
    });
  });
});
