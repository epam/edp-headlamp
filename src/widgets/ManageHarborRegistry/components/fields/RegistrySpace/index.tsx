import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { HARBOR_REGISTRY_SECRET_FORM_NAMES } from '../../../names';

export const RegistrySpace = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(HARBOR_REGISTRY_SECRET_FORM_NAMES.registrySpace.name)}
            label={`Registry Space`}
            control={control}
            errors={errors}
        />
    );
};
