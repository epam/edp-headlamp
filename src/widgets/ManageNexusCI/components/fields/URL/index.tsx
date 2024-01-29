import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldEditable
      {...register(NEXUS_INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the Nexus repository URL.',
        pattern: {
          value: /^(?!\/).*(?<!\/)$/,
          message: 'Path cannot start or end with slash symbol',
        },
      })}
      label={`URL`}
      title={
        'Enter the Nexus repository URL. Ensure it includes the correct protocol and endpoint (e.g., https://nexus.example.com).'
      }
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
    />
  );
};
