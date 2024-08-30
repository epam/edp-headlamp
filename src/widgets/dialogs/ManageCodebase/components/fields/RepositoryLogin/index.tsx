import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const RepositoryLogin = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.repositoryLogin.name, {
        required: 'Enter repository login',
        pattern: {
          value: /\w/,
          message: 'Enter valid repository login',
        },
      })}
      label={'Repository login'}
      placeholder={'Enter repository login'}
      control={control}
      errors={errors}
    />
  );
};
