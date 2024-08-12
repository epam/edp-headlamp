import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const Description = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEditStageFormValues>();

  return (
    <FormTextField
      {...register(STAGE_FORM_NAMES.description.name, {
        required: `Enter description.`,
      })}
      label={'Description'}
      title={
        'Provide a brief description of the environment to convey its purpose and characteristics.'
      }
      placeholder={'Enter description'}
      control={control}
      errors={errors}
    />
  );
};
