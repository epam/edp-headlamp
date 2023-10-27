import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const Namespace = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    return (
        <FormTextField
            {...register(STAGE_FORM_NAMES.deployNamespace.name, {
                required: `Enter namespace to deploy to`,
            })}
            label={'Namespace'}
            title={'Target namespace for deploying stage workload.'}
            placeholder={'Enter namespace to deploy to'}
            control={control}
            errors={errors}
            partiallyDisabled
        />
    );
};
