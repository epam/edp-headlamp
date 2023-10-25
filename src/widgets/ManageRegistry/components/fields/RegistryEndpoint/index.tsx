import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const RegistryEndpoint = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.REGISTRY_HOST)}
            label={`Registry Endpoint`}
            placeholder={'Enter registry endpoint'}
            title={'The URL or address of the Container registry.'}
            control={control}
            errors={errors}
        />
    );
};
