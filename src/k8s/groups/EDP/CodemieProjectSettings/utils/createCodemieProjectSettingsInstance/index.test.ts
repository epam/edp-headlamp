import { CODEMIE_PROJECT_SETTINGS_FORM_NAMES } from '../../../../../../widgets/ManageCodeMie/names';
import { createCodemieProjectSettingsInstance } from './index';

describe('testing createCodemieProjectSettingsInstance', () => {
  it('should return valid kube object', () => {
    const object = createCodemieProjectSettingsInstance(CODEMIE_PROJECT_SETTINGS_FORM_NAMES, {
      alias: 'test-alias',
      projectName: 'test-project-name',
      type: 'test-type',
      tokenName: 'test-token-name',
      url: 'test-url',
      codemieRefName: 'codemie',
    });

    expect(object).toMatchObject({
      apiVersion: 'edp.epam.com/v1alpha1',
      kind: 'CodemieProjectSettings',
      metadata: { name: 'test-project-name-git' },
      spec: {
        projectName: 'test-project-name',
        codemieRef: { kind: 'Codemie', name: 'codemie' },
        gitCredential: {
          secretRef: { name: 'test-project-name-git', secretKey: 'token' },
          tokenName: 'test-token-name',
          url: 'test-url',
        },
        alias: 'test-alias',
        type: 'test-type',
      },
    });
  });
});
