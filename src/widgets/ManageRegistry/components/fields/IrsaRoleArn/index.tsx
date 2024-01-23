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
        required: 'Enter the IAM role ARN for AWS ECR.',
      })}
      label={'IRSA Role ARN'}
      title={
        "Enter the IAM Role ARN for Service Accounts (IRSA). This role will be assigned to the platform's service account for accessing the registry on your behalf."
      }
      placeholder={'Enter IRSA Role ARN'}
      control={control}
      errors={errors}
    />
  );
};
