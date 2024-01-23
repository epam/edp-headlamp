import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { ownerReference },
  } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldPassword
      {...register(DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.token.name, {
        required: 'Enter the API token for DefectDojo authentication.',
      })}
      label={`Token`}
      title={
        'Provide an API token for authentication with DefectDojo. Generate the token from your DefectDojo instance and paste it here.'
      }
      placeholder={'Enter token'}
      control={control}
      errors={errors}
      disabled={!!ownerReference}
    />
  );
};
