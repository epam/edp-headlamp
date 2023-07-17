import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { SSHPrivateKeyProps } from './types';

export const SSHPrivateKey = ({ names, handleFormFieldChange }: SSHPrivateKeyProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.sshPrivateKey.name, {
                required: 'Enter your private SSH key',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
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
        />
    );
};
