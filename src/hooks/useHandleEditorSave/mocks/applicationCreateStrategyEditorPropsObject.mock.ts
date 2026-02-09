export const applicationCreateStrategyEditorPropsObjectMock = [
  {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Codebase',
    spec: {
      type: 'application',
      strategy: 'create',
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
    },
    metadata: {
      name: 'test',
    },
  },
];

export const applicationCreateStrategyEditorPropsObjectMockExpectedOutput = {
  type: 'application',
  strategy: 'create',
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
  name: 'test',
};
