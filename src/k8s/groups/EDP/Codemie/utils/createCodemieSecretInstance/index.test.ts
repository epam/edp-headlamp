import { CODEMIE_SECRET_FORM_NAMES } from '../../../../../../widgets/ManageCodeMie/names';
import {
  SECRET_LABEL_ASSOCIATED_KIND,
  SECRET_LABEL_SECRET_TYPE,
} from '../../../../default/Secret/labels';
import { CodemieKubeObjectConfig } from '../../config';
import { createCodemieSecretInstance } from './index';

describe('testing createCodemieSecretInstance', () => {
  it('should return valid kube object', () => {
    const object = createCodemieSecretInstance(CODEMIE_SECRET_FORM_NAMES, {
      name: 'codemie',
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });

    expect(object).toMatchObject({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'codemie',
        labels: {
          [SECRET_LABEL_SECRET_TYPE]: 'codemie',
          [SECRET_LABEL_ASSOCIATED_KIND]: CodemieKubeObjectConfig.kind,
        },
      },
      type: 'Opaque',
      data: {
        client_id: 'dGVzdC1jbGllbnQtaWQ=',
        client_secret: 'dGVzdC1jbGllbnQtc2VjcmV0',
      },
    });
  });
});
