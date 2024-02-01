import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { ownerReference },
  } = useFormContext<ManageSonarIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldPassword
      {...register(SONAR_INTEGRATION_SECRET_FORM_NAMES.token.name, {
        required: 'Enter the authentication token for SonarQube.',
      })}
      label={`Token`}
      title={
        'Provide an authentication token for SonarQube. Generate the token from your SonarQube instance.'
      }
      placeholder={'Enter token'}
      control={control}
      errors={errors}
      disabled={!!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
