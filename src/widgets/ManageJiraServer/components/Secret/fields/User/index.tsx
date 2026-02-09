import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const User = () => {
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

  const { secret, ownerReference } = useDataContext();

  return (
    <FormTextField
      {...register(INTEGRATION_SECRET_FORM_NAMES.username.name, {
        required: 'Enter your Jira username.',
      })}
      label={'User'}
      title={
        'Enter your Jira username for authentication. This is typically the username associated with your Jira account.'
      }
      placeholder={'Enter user name'}
      control={control}
      errors={errors}
      disabled={!!secret && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
