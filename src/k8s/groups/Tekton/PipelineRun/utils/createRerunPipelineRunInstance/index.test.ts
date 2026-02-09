import { v4 as uuidv4 } from 'uuid';
import { createRerunPipelineRunInstance } from './index';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const MOCKED_UUID = '1234';
(uuidv4 as jest.Mock).mockReturnValue(MOCKED_UUID);

describe('testing createRerunPipelineRunInstance', () => {
  it('should return a new pipeline run instance with the correct name', () => {
    const object = createRerunPipelineRunInstance({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      // @ts-ignore
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

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        name: 'r-build-test-codebase-name-test-codebase-branch-name-very--1234',
        labels: {
          'app.edp.epam.com/codebase': 'test-codebase-name',
          'app.edp.epam.com/codebasebranch':
            'test-codebase-name-test-codebase-branch-name-very-long-long-name',
          'app.edp.epam.com/pipelinetype': 'build',
          'dashboard.tekton.dev/rerunOf':
            'build-test-codebase-name-test-codebase-branch-name-very-lo-1234',
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
});
