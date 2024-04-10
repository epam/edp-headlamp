export const tektonServiceAccountMock = {
  apiVersion: 'v1',
  kind: 'ServiceAccount',
  metadata: {
    name: 'tekton',
    namespace: 'test-namespace',
    annotations: {
      'eks.amazonaws.com/role-arn': 'test-role-arn',
    },
  },
  secrets: [
    {
      name: 'kaniko-docker-config',
    },
  ],
};
