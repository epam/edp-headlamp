import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../names';

export const Description = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CDPIPELINE_FORM_NAMES.description.name, {
        required: 'Description is required',
      })}
      label={'Description'}
      title={'Enter Created Deployment Flow Description'}
      placeholder={'Enter description'}
      control={control}
      errors={errors}
      TextFieldProps={{
        multiline: true,
        minRows: 4,
        maxRows: 4,
      }}
    />
  );
};
