import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { JIRA_CI_FORM_NAMES } from '../../../names';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  return (
    <FormTextField
      {...register(JIRA_CI_FORM_NAMES.url.name, {
        required: 'Enter Jira URL (e.g.,https://your-jira-instance.com).',
        pattern: {
          value: /^(?!\/).*(?<!\/)$/,
          message: 'Path cannot start or end with slash symbol',
        },
      })}
      label={'URL'}
      title={
        'Provide the base URL of your Jira instance without any specific paths or endpoints (e.g., https://your-jira-instance.com).'
      }
      placeholder={'Enter Jira URL'}
      control={control}
      errors={errors}
    />
  );
};
