import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const RepositoryPasswordOrApiToken = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextFieldPassword
      {...register(CODEBASE_FORM_NAMES.repositoryPasswordOrApiToken.name, {
        required: 'Enter the repository password or access token',
        pattern: {
          value: /\w/,
          message: 'Enter valid repository password or api token',
        },
      })}
      label={'Repository password or access token'}
      placeholder={'Enter the repository password or access token'}
      control={control}
      errors={errors}
    />
  );
};
