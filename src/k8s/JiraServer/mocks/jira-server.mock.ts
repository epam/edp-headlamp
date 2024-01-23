export const JiraServerMock = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'JiraServer',
  // @ts-ignore
  metadata: {
    name: 'test-jira',
    namespace: 'test-namespace',
  },
  // @ts-ignore
  status: {
    available: true,
    status: 'finished',
  },
};
