import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldEncoded } from '../../../../../../../providers/Form/components/FormTextFieldEncoded';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { CREDENTIALS_FORM_NAME } from '../../../names';
import { CredentialsFormValues } from '../../../types';

export const SSHPrivateKey = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CredentialsFormValues>();

  const { gitServerSecret, credentialsFormMode } = useDataContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldEncoded
      {...register(CREDENTIALS_FORM_NAME.sshPrivateKey.name, {
        required: 'Paste your private SSH key for authentication.',
      })}
      label={'Private SSH key'}
      title={
        'Paste your private SSH key for secure authentication. Ensure it corresponds to the public key registered on your Git server.'
      }
      placeholder={'-----BEGIN OPENSSH PRIVATE KEY-----\n'}
      control={control}
      errors={errors}
      TextFieldProps={{
        multiline: true,
        minRows: 6,
        maxRows: 6,
        helperText:
          gitServerSecretOwnerReference &&
          `This field value is managed by ${gitServerSecretOwnerReference}`,
      }}
      disabled={credentialsFormMode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
