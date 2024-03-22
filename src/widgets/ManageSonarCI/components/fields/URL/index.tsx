import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageSonarIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldEditable
      {...register(SONAR_INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the SonarQube URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTP),
          message: 'Enter a valid URL with HTTP protocol.',
        },
      })}
      label={'URL'}
      title={
        'Enter the URL of your SonarQube instance. This is typically the address where SonarQube is hosted (e.g., https://sonarqube.example.com:9000).'
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
