import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageGitServerValues>();

  const {
    formData: { mode },
  } = useFormContext<ManageGitServerDataContext>();

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
      disabled={mode === FORM_MODES.EDIT}
    />
  );
};
