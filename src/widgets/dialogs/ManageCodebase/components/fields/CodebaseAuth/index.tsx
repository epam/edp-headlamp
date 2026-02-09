import React from 'react';
import { FormCheckbox } from '../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const CodebaseAuth = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormCheckbox
      {...register(CODEBASE_FORM_NAMES.hasCodebaseAuth.name)}
      label={<FormControlLabelWithTooltip label={'Repository credentials'} />}
      control={control}
      errors={errors}
    />
  );
};
