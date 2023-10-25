import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const Password = ({
    name,
}: {
    name: typeof REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD | typeof REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD;
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    return (
        <FormTextField
            {...register(name, {
                required: 'Enter password or token',
            })}
            label={`Password / Token`}
            title={
                'Enter the confidential combination used for authenticating your access to the Container registry.'
            }
            placeholder={'Enter password or token'}
            control={control}
            errors={errors}
            TextFieldProps={{ type: 'password' }}
        />
    );
};
