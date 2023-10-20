import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { ECR_REGISTRY_FORM_NAMES } from '../../../names';

export const RegistryEndpoint = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(ECR_REGISTRY_FORM_NAMES.registryHost.name)}
            label={`Registry Endpoint`}
            title={'The URL or address of the Container registry.'}
            control={control}
            errors={errors}
        />
    );
};
