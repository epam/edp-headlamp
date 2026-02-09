import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_SECRET_FORM_NAMES } from '../../../../names';

export const ClientSecret = () => {
  const {
    forms: { codemieSecret },
  } = useFormsContext();

  return (
    <FormTextFieldPassword
      {...codemieSecret.form.register(CODEMIE_SECRET_FORM_NAMES.clientSecret.name)}
      label={'Client Secret'}
      placeholder={'Enter Client Secret'}
      control={codemieSecret.form.control}
      errors={codemieSecret.form.formState.errors}
    />
  );
};
