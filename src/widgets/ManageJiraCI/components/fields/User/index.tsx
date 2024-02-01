import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../types';

export const User = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, isReadOnly, ownerReference },
  } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

  return (
    <FormTextField
      {...register(JIRA_INTEGRATION_SECRET_FORM_NAMES.username.name, {
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
