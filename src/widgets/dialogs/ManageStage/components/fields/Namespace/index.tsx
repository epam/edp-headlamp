import React from 'react';
import { FormTextFieldEditable } from '../../../../../../providers/Form/components/FormTextFieldEditable';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../names';

const nameRequirementLabel = `Name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Namespace = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextFieldEditable
      {...register(STAGE_FORM_NAMES.deployNamespace.name, {
        required: `Enter namespace to deploy to`,
        maxLength: {
          value: 63,
          message: 'You exceeded the maximum length of 63',
        },
        minLength: {
          value: 2,
          message: 'You must enter at least 2 characters',
        },
        pattern: {
          value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
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
