import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const User = ({
    name,
}: {
    name: typeof REGISTRY_NAMES.PUSH_ACCOUNT_USER | typeof REGISTRY_NAMES.PULL_ACCOUNT_USER;
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    return (
        <FormTextField
            {...register(name, {
                required: 'Enter user name',
            })}
            label={`User`}
            title={
                'Provide the unique identifier linked to your user account on the Container registry.'
            }
            placeholder={'Enter user name'}
            control={control}
            errors={errors}
        />
    );
};
