import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldEditable
      {...register(DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the DefectDojo URL.',
        pattern: {
          value: /^(?!\/).*(?<!\/)$/,
          message: 'Path cannot start or end with slash symbol',
        },
      })}
      label={'URL'}
      title={
        'Enter the URL of your DefectDojo instance. This is the address where DefectDojo is hosted (e.g., https://defectdojo.example.com).'
      }
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
