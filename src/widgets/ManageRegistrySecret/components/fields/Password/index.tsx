import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_SECRET_FORM_NAMES } from '../../../names';

export const Password = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_SECRET_FORM_NAMES.password.name, {
                required: 'Enter password',
            })}
            label={`Password`}
            placeholder={'Enter password'}
            control={control}
            errors={errors}
            TextFieldProps={{ type: 'password' }}
        />
    );
};
