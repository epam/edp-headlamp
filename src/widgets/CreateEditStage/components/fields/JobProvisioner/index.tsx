import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCDPipelineProvisionersQuery } from '../../../../../k8s/Jenkins/hooks/useCDPipelineProvisionersQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const JobProvisioner = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    const { data: CDPipelineProvisioners } = useCDPipelineProvisionersQuery();

    return (
        <FormSelect
            {...register(STAGE_FORM_NAMES.jobProvisioning.name)}
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
