import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
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
          value: getValidURLPattern(VALIDATED_PROTOCOLS.HTTP_OR_HTTPS),
          message: 'Enter a valid URL with HTTP/HTTPS protocol.',
        },
      })}
      label={`URL`}
      //@ts-ignore
      title={
        <>
          <p>
            Enter the Nexus repository URL depending service type. Ensure it includes the correct
            protocol and endpoint:
          </p>
          <p>
            Internal service example: <em>http://nexus.nexus-namespace:8081</em>
          </p>
          <p>
            External service example: <em>https://nexus.example.com</em>
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
