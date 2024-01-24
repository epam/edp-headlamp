import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

const nameRequirementLabel = `Component name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.name.name, {
        required: `Enter the Component name`,
        pattern: {
          value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
          message: nameRequirementLabel,
        },
        setValueAs: (value) => (typeof value === 'string' ? value.trim() : value),
      })}
      label={`Component name`}
      title={'Provide a clear and concise name for your component.'}
      placeholder={`Enter the Component name`}
      control={control}
      errors={errors}
    />
  );
};
