import { JiraCISecretMock } from '../../mocks/jira-ci-secret.mock';
import { createJiraIntegrationSecretInstance } from './index';

describe('testing createJiraIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createJiraIntegrationSecretInstance({
      username: 'test-username',
      password: 'test-password',
    });

    expect(object).toEqual(JiraCISecretMock);
  });
});
