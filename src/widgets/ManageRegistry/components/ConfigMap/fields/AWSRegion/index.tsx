import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { CONFIG_MAP_FORM_NAMES } from '../../../../names';

export const AWSRegion = () => {
  const {
    forms: { configMap },
  } = useRegistryFormsContext();

  return (
    <FormTextField
      {...configMap.form.register(CONFIG_MAP_FORM_NAMES.awsRegion.name)}
      label={`AWS Region`}
      placeholder={'Enter AWS region'}
      control={configMap.form.control}
      errors={configMap.form.formState.errors}
    />
  );
};
