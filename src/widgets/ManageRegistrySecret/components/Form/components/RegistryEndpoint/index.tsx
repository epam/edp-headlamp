import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from '../../../../names';

export const RegistryEndpoint = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_SECRET_CREATION_FORM_NAMES.registryEndpoint.name)}
            label={`Registry Endpoint`}
            control={control}
            errors={errors}
            disabled
        />
    );
};
