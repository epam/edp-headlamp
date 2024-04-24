import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const Token = () => {
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

  const { ownerReference } = useDataContext();

  return (
    <FormTextFieldPassword
      {...register(INTEGRATION_SECRET_FORM_NAMES.token.name, {
        required: 'Enter the authentication token for Argo CD.',
      })}
      label={`Token`}
      title={
        'Provide an authentication token for Argo CD. Generate the token from your Argo CD instance.'
      }
      placeholder={'Enter token'}
      control={control}
      errors={errors}
      disabled={!!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
