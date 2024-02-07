import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../types/forms';
import { useFormContext } from '../../../hooks/useFormContext';
import { JIRA_CI_FORM_NAMES } from '../../../names';

export const User = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, isReadOnly, ownerReference },
  } = useFormContext();

  return (
    <FormTextField
      {...register(JIRA_CI_FORM_NAMES.username.name, {
        required: 'Enter your Jira username.',
      })}
      label={'User'}
      title={
        'Enter your Jira username for authentication. This is typically the username associated with your Jira account.'
      }
      placeholder={'Enter user name'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && isReadOnly}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
