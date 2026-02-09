import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_FORM_NAMES } from '../../../../names';

export const ApiUrl = () => {
  const {
    forms: { codemie },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemie.form.register(CODEMIE_FORM_NAMES.apiUrl.name)}
      label={'API URL'}
      placeholder={'Enter API URL'}
      control={codemie.form.control}
      errors={codemie.form.formState.errors}
    />
  );
};
