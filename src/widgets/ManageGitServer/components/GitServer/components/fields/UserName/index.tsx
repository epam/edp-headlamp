import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../../../providers/Form/components/FormTextFieldEditable';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { GitServerFormValues } from '../../../types';

export const UserName = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<GitServerFormValues>();

  const { gitServerFormMode, gitServerSecret } = useDataContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldEditable
      {...register(GIT_SERVER_FORM_NAMES.gitUser.name, {
        required: 'Enter the username associated with your Git account.',
      })}
      label={'User'}
      title={'Provide the username associated with your Git account.'}
      placeholder={'git'}
      control={control}
      errors={errors}
      disabled={gitServerFormMode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
