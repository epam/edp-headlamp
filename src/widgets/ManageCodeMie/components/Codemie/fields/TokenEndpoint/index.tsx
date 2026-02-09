import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_FORM_NAMES } from '../../../../names';

export const TokenEndpoint = () => {
  const {
    forms: { codemie },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemie.form.register(CODEMIE_FORM_NAMES.tokenEndpoint.name)}
      label={'Token Endpoint'}
      placeholder={'Enter Token Endpoint'}
      control={codemie.form.control}
      errors={codemie.form.formState.errors}
    />
  );
};
