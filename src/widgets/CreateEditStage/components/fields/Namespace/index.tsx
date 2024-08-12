import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

const nameRequirementLabel = `Name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Namespace = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEditStageFormValues>();

  return (
    <FormTextFieldEditable
      {...register(STAGE_FORM_NAMES.deployNamespace.name, {
        required: `Enter namespace to deploy to`,
        maxLength: {
          value: 63,
          message: 'You exceeded the maximum length of 63',
        },
        pattern: {
          value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
          message: nameRequirementLabel,
        },
      })}
      label={'Namespace'}
      title={'Target namespace for deploying environment workload.'}
      placeholder={'Enter namespace to deploy to'}
      control={control}
      errors={errors}
    />
  );
};
