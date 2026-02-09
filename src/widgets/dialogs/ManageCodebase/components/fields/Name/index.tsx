import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

const nameRequirementLabel = `Component name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.name.name, {
        required: `Enter the Component name`,
        pattern: {
          value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
          message: nameRequirementLabel,
        },
        setValueAs: (value) => (typeof value === 'string' ? value.trim() : value),
        maxLength: {
          value: 30,
          message: `Component name must be less than 30 characters long`,
        },
      })}
      label={`Component name`}
      title={'Provide a clear and concise name for your component.'}
      placeholder={`Enter the Component name`}
      control={control}
      errors={errors}
    />
  );
};
