import React from 'react';
import { VALIDATED_PROTOCOL } from '../../../../../../constants/validatedProtocols';
import { FormTextFieldEditable } from '../../../../../../providers/Form/components/FormTextFieldEditable';
import { FORM_MODES } from '../../../../../../types/forms';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const URL = () => {
  const {
    forms: {
      secret: {
        form: {
          register,
          control,
          formState: { errors },
        },
      },
    },
  } = useFormsContext();

  const { mode, ownerReference } = useDataContext();

  return (
    <FormTextFieldEditable
      {...register(INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the SonarQube URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOL.HTTP_OR_HTTPS),
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
