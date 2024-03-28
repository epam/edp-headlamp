import React from 'react';
import { FormTextFieldPassword } from '../../../../../../../providers/Form/components/FormTextFieldPassword';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useGitServerFormsContext } from '../../../../../hooks/useGitServerFormsContext';
import { CREDENTIALS_FORM_NAME } from '../../../../../names';
import { useDataContext } from '../../../../../providers/Data/hooks';

export const SSHPublicKey = () => {
  const { gitServerSecret } = useDataContext();

  const {
    forms: { credentials: credentialsForm },
  } = useGitServerFormsContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...credentialsForm.form.register(CREDENTIALS_FORM_NAME.sshPublicKey.name, {
        required: 'Paste your public SSH key.',
      })}
      label={'Public SSH key'}
      title={
        'Paste your public SSH key corresponding to the private key provided. Register this key on your Git server.'
      }
      placeholder={'ssh-rsa PUBLIC KEY'}
      control={credentialsForm.form.control}
      errors={credentialsForm.form.formState.errors}
      TextFieldProps={{
        helperText:
          gitServerSecretOwnerReference &&
          `This field value is managed by ${gitServerSecretOwnerReference}`,
      }}
      disabled={credentialsForm.mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
