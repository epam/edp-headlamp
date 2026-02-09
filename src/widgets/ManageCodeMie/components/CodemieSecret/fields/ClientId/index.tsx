import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_SECRET_FORM_NAMES } from '../../../../names';

export const ClientId = () => {
  const {
    forms: { codemieSecret },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemieSecret.form.register(CODEMIE_SECRET_FORM_NAMES.clientId.name)}
      label={'Client ID'}
      placeholder={'Enter Client ID'}
      control={codemieSecret.form.control}
      errors={codemieSecret.form.formState.errors}
    />
  );
};
