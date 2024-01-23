import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const DefaultBranch = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.defaultBranch.name, {
        required: 'Specify a branch to work in.',
        pattern: {
          value: /^[a-z0-9][a-z0-9\/\-\.]*[a-z0-9]$/,
          message: 'Enter valid default branch name',
        },
      })}
      label={'Default branch'}
      title={
        'Set the default branch for your repository (e.g., main, master). This branch is typically used as the base for new development and integration work.'
      }
      placeholder={'Enter the default branch name'}
      control={control}
      errors={errors}
    />
  );
};
