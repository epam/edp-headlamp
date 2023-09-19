import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { ECR_SERVICE_ACCOUNT_FORM_NAMES } from '../../../names';

export const IrsaRoleArn = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    return (
        <FormTextField
            {...register(ECR_SERVICE_ACCOUNT_FORM_NAMES.irsaRoleArn.name, {
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
