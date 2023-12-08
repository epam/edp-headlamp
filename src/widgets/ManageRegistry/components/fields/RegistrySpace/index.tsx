import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

const TYPE_TITLE_MAP = {
    [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Provide the username for authentication.',
    [CONTAINER_REGISTRY_TYPE.ECR]:
        'Specify the Kubernetes namespace name to associate with AWS ECR.',
    [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]:
        'Specify the name of the DockerHub account or organization.',
    [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Specify the OpenShift registry space.',
};

const TYPE_EMPTY_MESSAGE_MAP = {
    [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Enter the username for Harbor registry authentication.',
    [CONTAINER_REGISTRY_TYPE.ECR]: 'Enter the Kubernetes namespace name for AWS ECR.',
    [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Enter the DockerHub account or organization name.',
    [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Enter the OpenShift registry space.',
};

export const RegistrySpace = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.REGISTRY_SPACE, {
                required: TYPE_EMPTY_MESSAGE_MAP[registryTypeFieldValue],
            })}
            label={`Registry Space`}
            title={TYPE_TITLE_MAP[registryTypeFieldValue]}
            placeholder={'Enter registry space'}
            control={control}
            errors={errors}
        />
    );
};
