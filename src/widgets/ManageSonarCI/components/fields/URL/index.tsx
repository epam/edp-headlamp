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
          value: getValidURLPattern(VALIDATED_PROTOCOLS.HTTP_OR_HTTPS),
          message: 'Enter a valid URL with HTTP/HTTPS protocol.',
        },
      })}
      label={'URL'}
      //@ts-ignore
      title={
        <>
          <p>
            Enter the URL of your SonarQube instance depending on a service type. Ensure it includes
            the correct protocol and endpoint:
          </p>
          <p>
            Internal service example: <em>http://sonarqube.sonarqube-namespace: 9000</em>
          </p>
          <p>
            External service example: <em>https://sonarqube.example.com</em>
          </p>
        </>
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
