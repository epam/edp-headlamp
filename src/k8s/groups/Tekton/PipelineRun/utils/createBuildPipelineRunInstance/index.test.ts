import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { createBuildPipelineRunInstance } from './index';

describe('testing createBuildPipelineRunInstance', () => {
  it('should return valid kube object', () => {
    const object = createBuildPipelineRunInstance({
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
      triggerTemplate: {
        apiVersion: 'triggers.tekton.dev/v1beta1',
        kind: 'TriggerTemplate',
        metadata: {
          name: 'gerrit-build-template',
          namespace: 'test-namespace',
          creationTimestamp: '',
          uid: '',
        },
        spec: {
          params: [
            {
              default: 'master',
              description: 'The git revision',
              name: 'gitrevision',
            },
            {
              description: 'Gerrit project name',
              name: 'gerritproject',
            },
            {
              description: 'Codebase name used in pipeline',
              name: 'codebase',
            },
            {
              description: 'Codebasebranch name used in pipeline',
              name: 'codebasebranch',
            },
            {
              description: 'Change number from Merge Request',
              name: 'changeNumber',
            },
            {
              description: 'Patchset number from Merge Request',
              name: 'patchsetNumber',
            },
            {
              description: 'Ticket name pattern',
              name: 'ticketNamePattern',
            },
            {
              description: 'Commit message pattern to run commit-validate task',
              name: 'commitMessagePattern',
            },
            {
              description: 'Commit message',
              name: 'commitMessage',
            },
            {
              description: 'Jira issue payload',
              name: 'jiraIssueMetadataPayload',
            },
            {
              description: 'Jira server name',
              name: 'jiraServer',
            },
            {
              description:
                'Pipeline to trigger. Populated by edp interceptor from codebasebranch spec',
              name: 'pipelineName',
            },
          ],
          resourcetemplates: [
            {
              apiVersion: 'tekton.dev/v1',
              kind: 'PipelineRun',
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
            },
          ],
        },
      },
      gitServer: {
        spec: {
          gitHost: 'test-git-host',
          gitUser: 'test-git-user',
          sshPort: 123,
          nameSshKeySecret: 'test-ssh-key-secret',
          gitProvider: 'test-git-provider',
        },
      } as GitServerKubeObjectInterface,
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        generateName: 'test-codebase-name-test-codebase-branch-name-build-',
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch': 'test-codebase-name-test-codebase-branch-name',
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
            value: 'test-codebase-name-test-codebase-branch-name',
          },
          { name: 'changeNumber', value: '1' },
          { name: 'patchsetNumber', value: '1' },
          { name: 'TICKET_NAME_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE_PATTERN', value: '' },
          { name: 'COMMIT_MESSAGE', value: '' },
          { name: 'JIRA_ISSUE_METADATA_PAYLOAD', value: '' },
          { name: 'JIRA_SERVER', value: '' },
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
