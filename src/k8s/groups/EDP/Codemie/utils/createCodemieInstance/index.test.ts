import { CODEMIE_FORM_NAMES } from '../../../../../../widgets/ManageCodeMie/names';
import { createCodemieInstance } from './index';

describe('testing createCodemieInstance', () => {
  it('should return valid kube object', () => {
    const object = createCodemieInstance(CODEMIE_FORM_NAMES, {
      name: 'codemie',
      tokenEndpoint: 'test-token-endpoint',
      apiUrl: 'test-api-url',
    });

    expect(object).toMatchObject({
      apiVersion: 'edp.epam.com/v1alpha1',
      kind: 'Codemie',
      metadata: { name: 'codemie' },
      spec: {
        oidc: {
          secretRef: {
            name: 'codemie',
            clientKey: 'client_id',
            secretKey: 'client_secret',
          },
          tokenEndpoint: 'test-token-endpoint',
        },
        url: 'test-api-url',
      },
    });
  });
});
