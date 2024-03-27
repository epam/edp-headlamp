import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../../../providers/Form/components/FormTextFieldPassword';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { CREDENTIALS_FORM_NAME } from '../../../names';
import { CredentialsFormValues } from '../../../types';

export const Token = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CredentialsFormValues>();

  const { gitServerSecret, credentialsFormMode } = useDataContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...register(CREDENTIALS_FORM_NAME.token.name, {
        required: 'Enter your access token',
      })}
      label={'Access token'}
      control={control}
      errors={errors}
      disabled={credentialsFormMode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
