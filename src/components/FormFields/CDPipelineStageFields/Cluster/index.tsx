import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_CLUSTER } from '../../../../constants/clusters';
import { useClusterSecretListQuery } from '../../../../k8s/Secret/hooks/useClusterSecretListQuery';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { ClusterProps } from './types';

const defaultClusterOption = {
    label: DEFAULT_CLUSTER,
    value: DEFAULT_CLUSTER,
};

export const Cluster = ({ names, handleFormFieldChange }: ClusterProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { data, isLoading } = useClusterSecretListQuery({});

    const clusterOptions = React.useMemo(() => {
        if (isLoading) {
            return [defaultClusterOption];
        }
        const clusters = data?.items.map(({ data: { name } }) => {
            const decodedName = atob(unescape(name));
            return {
                label: decodedName,
                value: decodedName,
            };
        });

        return [defaultClusterOption, ...clusters];
    }, [data?.items, isLoading]);

    return (
        <FormSelect
            {...register(names.cluster.name, {
                required: 'Select cluster',
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Cluster'}
            placeholder={'Select cluster'}
            control={control}
            errors={errors}
            options={clusterOptions}
        />
    );
};
