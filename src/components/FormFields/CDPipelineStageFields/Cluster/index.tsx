import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { ClusterProps } from './types';

export const Cluster = ({ names, handleFormFieldChange }: ClusterProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

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
            defaultValue={'in_cluster'}
            options={[
                {
                    label: 'In cluster',
                    value: 'in_cluster',
                },
            ]}
        />
    );
};
