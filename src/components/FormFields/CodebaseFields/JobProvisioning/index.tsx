import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCIPipelineProvisionersQuery } from '../../../../k8s/Jenkins/hooks/useCIPipelineProvisionersQuery';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { JobProvisioningProps } from './types';

export const JobProvisioning = ({ names, handleFormFieldChange }: JobProvisioningProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { data: CIPipelineProvisioners } = useCIPipelineProvisionersQuery();

    return (
        <FormSelect
            {...register(names.jobProvisioning.name, {
                required: 'Select CI pipeline provisioner',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'CI pipeline provisioner'}
            placeholder={'Select CI pipeline provisioner'}
            control={control}
            errors={errors}
            options={
                CIPipelineProvisioners &&
                CIPipelineProvisioners.map(el => ({
                    label: el,
                    value: el,
                }))
            }
        />
    );
};
