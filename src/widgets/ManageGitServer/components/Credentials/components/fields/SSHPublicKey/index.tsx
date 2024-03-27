import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../../../providers/Form/components/FormTextFieldPassword';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { CREDENTIALS_FORM_NAME } from '../../../names';
import { CredentialsFormValues } from '../../../types';

export const SSHPublicKey = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CredentialsFormValues>();

  const { gitServerSecret, credentialsFormMode } = useDataContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...register(CREDENTIALS_FORM_NAME.sshPublicKey.name, {
        required: 'Paste your public SSH key.',
      })}
      label={'Public SSH key'}
      title={
        'Paste your public SSH key corresponding to the private key provided. Register this key on your Git server.'
      }
      placeholder={'ssh-rsa PUBLIC KEY'}
      control={control}
      errors={errors}
      TextFieldProps={{
        helperText:
          gitServerSecretOwnerReference &&
          `This field value is managed by ${gitServerSecretOwnerReference}`,
      }}
      disabled={credentialsFormMode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
