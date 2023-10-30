import React from 'react';
import { useFormContext as useHookFormContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const RegistryEndpoint = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useHookFormContext();

    const {
        formData: { EDPConfigMap },
    } = useFormContext<ManageRegistryDataContext>();

    const registryType = EDPConfigMap?.data.container_registry_type;

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.REGISTRY_HOST)}
            label={`Registry Endpoint`}
            placeholder={'Enter registry endpoint'}
            title={'The URL or address of the Container registry.'}
            control={control}
            errors={errors}
            disabled={registryType === CONTAINER_REGISTRY_TYPE.DOCKER_HUB}
        />
    );
};
