import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerValues } from '../../../types';

export const HostName = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.gitHost.name, {
                required: 'Enter host name',
                pattern: {
                    value: /^([a-z\d]+(-[a-z\d]+)*\.)+[a-z\d-]{2,}$/,
                    message: 'Enter correct host name',
                },
            })}
            label={'Host'}
            placeholder={'host-name.com'}
            control={control}
            errors={errors}
        />
    );
};
