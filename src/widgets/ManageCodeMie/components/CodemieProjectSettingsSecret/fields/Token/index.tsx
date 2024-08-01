import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES } from '../../../../names';

export const Token = () => {
  const {
    forms: { codemieProjectSettingsSecret },
  } = useFormsContext();

  return (
    <FormTextFieldPassword
      {...codemieProjectSettingsSecret.form.register(
        CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES.token.name
      )}
      label={'Token'}
      placeholder={'Enter Token'}
      control={codemieProjectSettingsSecret.form.control}
      errors={codemieProjectSettingsSecret.form.formState.errors}
    />
  );
};
