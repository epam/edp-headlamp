import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_PROJECT_SETTINGS_FORM_NAMES } from '../../../../names';

export const TokenName = () => {
  const {
    forms: { codemieProjectSettings },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemieProjectSettings.form.register(CODEMIE_PROJECT_SETTINGS_FORM_NAMES.tokenName.name)}
      label={'Token Name'}
      placeholder={'Enter Token Name'}
      control={codemieProjectSettings.form.control}
      errors={codemieProjectSettings.form.formState.errors}
    />
  );
};
