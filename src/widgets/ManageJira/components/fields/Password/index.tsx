import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { FORM_MODES } from '../../../../../types/forms';
import { useFormContext } from '../../../hooks/useFormContext';
import { JIRA_CI_FORM_NAMES } from '../../../names';

export const Password = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, isReadOnly, ownerReference },
  } = useFormContext();

  return (
    <FormTextFieldPassword
      {...register(JIRA_CI_FORM_NAMES.password.name, {
        required: 'Enter your Jira password.',
      })}
      label={'Password'}
      title={'Provide the password associated with your Jira account.'}
      placeholder={'Enter password'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && isReadOnly}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
