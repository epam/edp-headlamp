import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../types';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageDependencyTrackIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldEditable
      {...register(DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the DependencyTrack URL.',
        pattern: {
          value: /^(?!\/).*(?<!\/)$/,
          message: 'Path cannot start or end with slash symbol',
        },
      })}
      label={'URL'}
      title={
        'Enter the URL of your DependencyTrack instance. This is typically the address where DependencyTrack is hosted (e.g., https://deptrack.example.com).'
      }
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
