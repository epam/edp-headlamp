import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const Password = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldPassword
      {...register(NEXUS_INTEGRATION_SECRET_FORM_NAMES.password.name, {
        required: 'Provide the password associated with your Nexus repository username.',
      })}
      label={`Password`}
      title={'Enter the password associated with your Nexus repository username.'}
      placeholder={'Enter password'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
    />
  );
};
