import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCDPipelineProvisionersQuery } from '../../../../k8s/Jenkins/hooks/useCDPipelineProvisionersQuery';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { JobProvisionerProps } from './types';

export const JobProvisioner = ({ names, handleFormFieldChange }: JobProvisionerProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { data: CDPipelineProvisioners } = useCDPipelineProvisionersQuery();

    return (
        <FormSelect
            {...register(names.jobProvisioning.name, {
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Job provisioner'}
            placeholder={'Select job provisioner'}
            control={control}
            errors={errors}
            options={
                CDPipelineProvisioners &&
                CDPipelineProvisioners.map(el => ({
                    label: el,
                    value: el,
                }))
            }
        />
    );
};
