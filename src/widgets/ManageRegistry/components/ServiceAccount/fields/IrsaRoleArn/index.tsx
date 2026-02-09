import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { SERVICE_ACCOUNT_FORM_NAMES } from '../../../../names';

export const IrsaRoleArn = () => {
  const {
    forms: { serviceAccount },
  } = useRegistryFormsContext();

  return (
    <FormTextField
      {...serviceAccount.form.register(SERVICE_ACCOUNT_FORM_NAMES.irsaRoleArn.name, {
        required: 'Enter the IAM role ARN for AWS ECR.',
      })}
      label={'IRSA Role ARN'}
      title={
        "Enter the IAM Role ARN for Service Accounts (IRSA). This role will be assigned to the platform's service account for accessing the registry on your behalf."
      }
      placeholder={'Enter IRSA Role ARN'}
      control={serviceAccount.form.control}
      errors={serviceAccount.form.formState.errors}
    />
  );
};
