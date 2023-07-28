import React from 'react';
import { useFormContext } from 'react-hook-form';
import { deploymentTypeSelectOptions } from '../../../../../configs/select-options/deploymentTypes';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { CreateEditCDPipelineFormValues } from '../../../types';

export const DeploymentType = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditCDPipelineFormValues>();

    return (
        <FormSelect
            {...register(CDPIPELINE_FORM_NAMES.deploymentType.name, {
                required: 'Select deployment type',
            })}
            label={'Deployment type'}
            placeholder={'Select deployment type'}
            control={control}
            errors={errors}
            options={deploymentTypeSelectOptions}
        />
    );
};
