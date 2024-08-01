import { createCodebaseSecretInstance } from './index';

describe('testing createCodebaseSecretInstance', () => {
  it('should create correct object', () => {
    const object = createCodebaseSecretInstance({
      codebaseName: 'test-codebase-name',
      repositoryLogin: 'test-login',
      repositoryPassword: 'test-password',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: { name: 'repository-codebase-test-codebase-name-temp' },
      data: { username: 'dGVzdC1sb2dpbg==', password: 'dGVzdC1wYXNzd29yZA==' },
    });
  });
});
