import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCIPipelineProvisionersQuery } from '../../../../../k8s/Jenkins/hooks/useCIPipelineProvisionersQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const JobProvisioning = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    const { data: CIPipelineProvisioners } = useCIPipelineProvisionersQuery();

    return (
        <FormSelect
            {...register(CODEBASE_FORM_NAMES.jobProvisioning.name, {
                required: 'Select CI pipeline provisioner',
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
