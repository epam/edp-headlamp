import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEncoded } from '../../../../../providers/Form/components/FormTextFieldEncoded';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const SSHPrivateKey = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    const {
        formData: { mode, gitServerSecret },
    } = useFormContext<ManageGitServerDataContext>();
    const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <FormTextFieldEncoded
            {...register(GIT_SERVER_FORM_NAMES.sshPrivateKey.name, {
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
            }}
            disabled={mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
        />
    );
};
