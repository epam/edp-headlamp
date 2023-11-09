import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldDecodeable } from '../../../../../providers/Form/components/FormTextFieldDecodeable';
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
        <FormTextFieldDecodeable
            {...register(GIT_SERVER_FORM_NAMES.sshPrivateKey.name, {
                required: 'Enter your private SSH key',
            })}
            label={'Private SSH key'}
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
