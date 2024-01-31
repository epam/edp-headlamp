import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { SSO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSSOIntegrationSecretFormDataContext } from '../../../types';

export const User = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, isReadOnly, ownerReference },
  } = useFormContext<ManageSSOIntegrationSecretFormDataContext>();

  return (
    <FormTextField
      {...register(SSO_INTEGRATION_SECRET_FORM_NAMES.username.name, {
        required: 'Enter your realm provisioner username.',
      })}
      label={'User'}
      title={'Enter your realm provisioner username associated with your Keycloak SSO account.'}
      placeholder={'Enter user name'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && isReadOnly}
      TextFieldProps={{
        helperText: `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
