import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerValues } from '../../../types';

export const SSHPort = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.sshPort.name, {
                required: 'Enter SSH port',
                pattern: {
                    value: /^(\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    message: 'Enter correct ssh port',
                },
                setValueAs: (value: string) => (value ? Number(value) : value),
            })}
            label={'SSH port'}
            placeholder={'Enter SSH port'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'number',
            }}
        />
    );
};
