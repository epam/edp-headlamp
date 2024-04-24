import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
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
        required: 'Enter Jira URL (e.g., https://your-jira-instance.com).',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
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
