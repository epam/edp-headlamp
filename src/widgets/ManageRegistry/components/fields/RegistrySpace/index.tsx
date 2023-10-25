import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const RegistrySpace = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.REGISTRY_SPACE)}
            label={`Registry Space`}
            placeholder={'Enter registry space'}
            control={control}
            errors={errors}
        />
    );
};
