import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';

export const SkipTLSVerify = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormCheckbox
      {...register(CLUSTER_CREATION_FORM_NAMES.skipTLSVerify.name)}
      label={<FormControlLabelWithTooltip label={'Skip TLS verification'} />}
      control={control}
      errors={errors}
    />
  );
};
