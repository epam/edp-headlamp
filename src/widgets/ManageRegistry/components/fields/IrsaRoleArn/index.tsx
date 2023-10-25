import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

export const IrsaRoleArn = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    return (
        <FormTextField
            {...register(REGISTRY_NAMES.IRSA_ROLE_ARN, {
                required: 'Enter IRSA Role ARN',
            })}
            label={'IRSA Role ARN'}
            title={'The IAM Role ARN with push permissions to ECR'}
            placeholder={'Enter IRSA Role ARN'}
            control={control}
            errors={errors}
        />
    );
};
