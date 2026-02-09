import React from 'react';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

const normalizeNameValue = (value: string): string =>
  typeof value === 'string' ? value.trim() : value;

const nameRequirementLabel = `Component name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Name = () => {
  const {
    register,
    control,
    formState: { errors, dirtyFields },
    setValue,
    watch,
  } = useTypedFormContext();

  const gitServerFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name);

  const onChange = ({ target: { value } }: FieldEvent): void => {
    const normalizedValue = normalizeNameValue(value);
    if (
      Object.hasOwn(dirtyFields, CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name) ||
      gitServerFieldValue !== GIT_PROVIDER.GERRIT
    )
      return;

    setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name, normalizedValue);
  };

  return (
    <FormTextField
      {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.name.name, {
        required: `Enter the Component name.`,
        pattern: {
          value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
          message: nameRequirementLabel,
        },
        setValueAs: (value: string) => normalizeNameValue(value),
        onChange: onChange,
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
