import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';
import { getGitServerSecret } from '../../../utils/getGitServerSecret';

export const SSHPublicKey = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useReactHookFormContext<ManageGitServerValues>();

  const {
    formData: { mode, gitServer, repositorySecrets },
  } = useFormContext<ManageGitServerDataContext>();

  const gitProviderFieldValue = watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

  const gitServerSecret = React.useMemo(
    () => getGitServerSecret(gitServer, repositorySecrets, gitProviderFieldValue),
    [gitProviderFieldValue, gitServer, repositorySecrets]
  );

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...register(GIT_SERVER_FORM_NAMES.sshPublicKey.name, {
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
        helperText: `This field value is managed by ${gitServerSecretOwnerReference}`,
      }}
      disabled={mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
