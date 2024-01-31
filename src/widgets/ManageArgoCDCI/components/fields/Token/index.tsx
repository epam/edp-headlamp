import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { ownerReference },
  } = useFormContext<ManageArgoCDIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldPassword
      {...register(ARGOCD_INTEGRATION_SECRET_FORM_NAMES.token.name, {
        required: 'Enter the authentication token for Argo CD.',
      })}
      label={`Token`}
      title={
        'Provide an authentication token for Argo CD. Generate the token from your Argo CD instance.'
      }
      placeholder={'Enter token'}
      control={control}
      errors={errors}
      disabled={!!ownerReference}
      TextFieldProps={{
        helperText: `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
