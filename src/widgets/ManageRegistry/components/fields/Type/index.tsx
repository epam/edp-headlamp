import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import {
    CONTAINER_REGISTRY_PLATFORM,
    CONTAINER_REGISTRY_TYPE,
    CONTAINER_REGISTRY_TYPE_BY_PLATFORM,
    CONTAINER_REGISTRY_TYPE_LABEL_MAP,
} from '../../../../../k8s/ConfigMap/constants';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent } from '../../../../../types/forms';
import { ValueOf } from '../../../../../types/global';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

const createRegistryTypeOptions = (platformName: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>) => {
    if (!platformName || !CONTAINER_REGISTRY_TYPE_BY_PLATFORM?.[platformName]) {
        return [];
    }

    return CONTAINER_REGISTRY_TYPE_BY_PLATFORM[platformName].map(value => ({
        label: CONTAINER_REGISTRY_TYPE_LABEL_MAP[value],
        value: value,
    }));
};

export const Type = () => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
    } = useReactHookFormDataContext();

    const {
        formData: { EDPConfigMap },
    } = useFormContext<ManageRegistryDataContext>();

    const platform = EDPConfigMap?.data.platform;

    const registryTypeOptions = React.useMemo(
        () => createRegistryTypeOptions(platform as ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>),
        [platform]
    );

    return (
        <FormSelect
            {...register(REGISTRY_NAMES.REGISTRY_TYPE, {
                required: 'Select a registry type you would like to create.',
                onChange: ({ target: { value } }: FieldEvent) => {
                    if (value === CONTAINER_REGISTRY_TYPE.DOCKER_HUB) {
                        setValue(REGISTRY_NAMES.REGISTRY_HOST, 'docker.io');
                    }
                },
            })}
            label={'Registry Provider'}
            title={'Select a registry type you would like to create'}
            placeholder={'Select a registry type you would like to create'}
            control={control}
            errors={errors}
            options={registryTypeOptions}
        />
    );
};
