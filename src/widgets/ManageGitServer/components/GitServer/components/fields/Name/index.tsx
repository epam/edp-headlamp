import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { GitServerFormValues } from '../../../types';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<GitServerFormValues>();

  const { gitServerFormMode } = useDataContext();

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
      disabled={gitServerFormMode === FORM_MODES.EDIT}
    />
  );
};
