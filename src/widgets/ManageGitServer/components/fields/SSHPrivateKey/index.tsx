import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const SSHPrivateKey = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageGitServerDataContext>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.sshPrivateKey.name, {
                required: 'Enter your private SSH key',
            })}
            label={'Private SSH key'}
            placeholder={
                '-----BEGIN OPENSSH PRIVATE KEY-----\n' +
                '                PRIVATE KEY   \n' +
                '-----END OPENSSH PRIVATE KEY-----'
            }
            control={control}
            errors={errors}
            TextFieldProps={{
                multiline: true,
                minRows: 4,
                maxRows: 4,
            }}
            disabled={isReadOnly}
        />
    );
};
