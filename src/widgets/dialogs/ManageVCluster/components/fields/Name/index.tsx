import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { V_CLUSTER_FORM_NAMES } from '../../../names';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(V_CLUSTER_FORM_NAMES.name.name, {
        required: 'Enter a virtual cluster name.',
        pattern: {
          value: /^[a-z]+$/,
          message: 'Name must consist of lower case alphabetic characters only.',
        },
        maxLength: {
          value: 10,
          message: 'Name must be less than 10 characters.',
        },
      })}
      label={'Name'}
      placeholder={'My cluster'}
      control={control}
      errors={errors}
    />
  );
};
