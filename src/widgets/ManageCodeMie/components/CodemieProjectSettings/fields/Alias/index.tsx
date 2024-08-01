import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_PROJECT_SETTINGS_FORM_NAMES } from '../../../../names';

export const Alias = () => {
  const {
    forms: { codemieProjectSettings },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemieProjectSettings.form.register(CODEMIE_PROJECT_SETTINGS_FORM_NAMES.alias.name)}
      label={'Alias'}
      placeholder={'Enter Alias'}
      control={codemieProjectSettings.form.control}
      errors={codemieProjectSettings.form.formState.errors}
    />
  );
};
