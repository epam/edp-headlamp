import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const Description = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    return (
        <FormTextField
            {...register(STAGE_FORM_NAMES.description.name, {
                required: `Enter stage description`,
            })}
            label={'Description'}
            placeholder={'Enter stage description'}
            control={control}
            errors={errors}
        />
    );
};
