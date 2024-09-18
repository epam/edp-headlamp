import React from 'react';
import { FormTextFieldEncoded } from '../../../../../../../providers/Form/components/FormTextFieldEncoded';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { CREDENTIALS_FORM_NAME } from '../../../../../names';
import { useDataContext } from '../../../../../providers/Data/hooks';

export const SSHPrivateKey = () => {
  const { gitServerSecret } = useDataContext();

  const {
    forms: { credentials: credentialsForm },
  } = useFormsContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldEncoded
      {...credentialsForm.form.register(CREDENTIALS_FORM_NAME.sshPrivateKey.name, {
        required: 'Paste your private SSH key for authentication.',
      })}
      label={'Private SSH key'}
      title={
        'Paste your private SSH key for secure authentication. Ensure it corresponds to the public key registered on your Git server.'
      }
      placeholder={'-----BEGIN OPENSSH PRIVATE KEY-----\n'}
      control={credentialsForm.form.control}
      errors={credentialsForm.form.formState.errors}
      TextFieldProps={{
        multiline: true,
        minRows: 6,
        maxRows: 6,
        helperText:
          gitServerSecretOwnerReference &&
          `This field value is managed by ${gitServerSecretOwnerReference}`,
      }}
      disabled={credentialsForm.mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
