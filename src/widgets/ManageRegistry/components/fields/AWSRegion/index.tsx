import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const AWSRegion = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.AWS_REGION)}
            label={`AWS Region`}
            placeholder={'Enter AWS region'}
            control={control}
            errors={errors}
        />
    );
};
