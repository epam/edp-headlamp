import { createChatAssistantIntegrationSecretInstance } from './index';

describe('testing createChatAssistantIntegrationSecretInstance', () => {
  it('should create correct object', () => {
    const object = createChatAssistantIntegrationSecretInstance({
      apiUrl: 'https://api-url.com',
      assistantId: 'assistant-id',
      token: 'test-token',
    });

    expect(object).toEqual({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'ci-codemie',
        labels: {
          'app.edp.epam.com/secret-type': 'codemie',
          'app.edp.epam.com/integration-secret': 'true',
        },
      },
      type: 'Opaque',
      data: {
        apiUrl: 'aHR0cHM6Ly9hcGktdXJsLmNvbQ==',
        assistantId: 'YXNzaXN0YW50LWlk',
        token: 'dGVzdC10b2tlbg==',
      },
    });
  });
});
