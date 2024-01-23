export const applicationCloneStrategyEditorPropsObjectMock = [
  {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Codebase',
    spec: {
      type: 'application',
      strategy: 'clone',
      gitServer: 'gerrit',
      ciTool: 'tekton',
      emptyProject: false,
      defaultBranch: 'master',
      lang: 'Java',
      framework: 'java11',
      buildTool: 'gradle',
      versioning: {
        type: 'edp',
        startFrom: '0.0.0-SNAPSHOT',
      },
      deploymentScript: 'helm-chart',
      jiraServer: 'epam-jira',
      commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
      ticketNamePattern: 'PROJECT_NAME-\\d{4}',
      jiraIssueMetadataPayload: '{"components":"test1","fixVersions":"test2","labels":"test3"}',
      repository: {
        url: 'https://github.com/kinvolk/headlamp.git',
      },
    },
    metadata: {
      name: 'test',
    },
  },
];

export const applicationCloneStrategyEditorPropsObjectMockExpectedOutput = {
  type: 'application',
  strategy: 'clone',
  gitServer: 'gerrit',
  ciTool: 'tekton',
  emptyProject: false,
  defaultBranch: 'master',
  lang: 'Java',
  framework: 'java11',
  buildTool: 'gradle',
  versioningType: 'edp',
  versioningStartFrom: '0.0.0-SNAPSHOT',
  deploymentScript: 'helm-chart',
  jiraServer: 'epam-jira',
  commitMessagePattern: '^\\[PROJECT_NAME-\\d{4}\\]:.*$',
  ticketNamePattern: 'PROJECT_NAME-\\d{4}',
  jiraIssueMetadataPayload: '{"components":"test1","fixVersions":"test2","labels":"test3"}',
  repositoryUrl: 'https://github.com/kinvolk/headlamp.git',
  name: 'test',
};
