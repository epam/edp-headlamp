import React from 'react';
import { useFormContext as useHookFormContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const RegistryEndpoint = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useHookFormContext();

    const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.REGISTRY_HOST)}
            label={`Registry Endpoint`}
            placeholder={'Enter registry endpoint'}
            title={'The URL or address of the Container registry.'}
            control={control}
            errors={errors}
            disabled={registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB}
        />
    );
};
