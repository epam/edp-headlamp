import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from '../../../../names';

export const User = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_SECRET_CREATION_FORM_NAMES.user.name, {
                required: 'Enter user name',
            })}
            label={`User`}
            placeholder={'Enter user name'}
            control={control}
            errors={errors}
        />
    );
};
