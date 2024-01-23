import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const RepositoryPasswordOrApiToken = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

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
