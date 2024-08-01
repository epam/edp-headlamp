import { CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES } from '../../../../../../widgets/ManageCodeMie/names';
import {
  SECRET_LABEL_ASSOCIATED_KIND,
  SECRET_LABEL_SECRET_TYPE,
} from '../../../../default/Secret/labels';
import { CodemieProjectSettingsKubeObjectConfig } from '../../config';
import { createCodemieProjectSettingsSecretInstance } from './index';

describe('testing createCodemieProjectSettingsSecretInstance', () => {
  it('should return valid kube object', () => {
    const object = createCodemieProjectSettingsSecretInstance(
      CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES,
      {
        projectName: 'test-project-name',
        token: 'test-token',
      }
    );

    expect(object).toMatchObject({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: 'test-project-name-git',
        labels: {
          [SECRET_LABEL_SECRET_TYPE]: 'codemie',
          [SECRET_LABEL_ASSOCIATED_KIND]: CodemieProjectSettingsKubeObjectConfig.kind,
        },
      },
      data: { token: 'dGVzdC10b2tlbg==' },
      type: 'Opaque',
    });
  });
});
