import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { FORM_MODES } from '../../../../../../types/forms';
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

  const { mode, ownerReference } = useDataContext();

  return (
    <FormTextFieldPassword
      {...register(INTEGRATION_SECRET_FORM_NAMES.token.name, {
        required: 'Enter token',
      })}
      label={'Token'}
      placeholder={'Enter token'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
