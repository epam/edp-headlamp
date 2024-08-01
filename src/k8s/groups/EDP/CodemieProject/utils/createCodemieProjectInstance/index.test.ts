import { CODEMIE_PROJECT_FORM_NAMES } from '../../../../../../widgets/ManageCodeMie/names';
import { createCodemieProjectInstance } from './index';

describe('testing createCodemieProjectInstance', () => {
  it('should return valid kube object', () => {
    const object = createCodemieProjectInstance(CODEMIE_PROJECT_FORM_NAMES, {
      projectName: 'test-project-name',
      codemieRefName: 'codemie',
    });

    expect(object).toMatchObject({
      apiVersion: 'edp.epam.com/v1alpha1',
      kind: 'CodemieProject',
      metadata: { name: 'test-project-name' },
      spec: {
        name: 'test-project-name',
        codemieRef: { kind: 'Codemie', name: 'codemie' },
      },
    });
  });
});
