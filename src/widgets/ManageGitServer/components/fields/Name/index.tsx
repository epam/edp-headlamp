import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerValues } from '../../../types';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageGitServerValues>();

  return (
    <FormTextField
      {...register(GIT_SERVER_FORM_NAMES.name.name, {
        required: 'Enter the Git server name.',
      })}
      label={'Name'}
      title={'Enter the name of your Git Server (e.g., my-github).'}
      placeholder={'my-github'}
      control={control}
      errors={errors}
    />
  );
};
