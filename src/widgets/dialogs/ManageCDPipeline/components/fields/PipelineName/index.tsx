import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../names';

export const PipelineName = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CDPIPELINE_FORM_NAMES.name.name, {
        required: `The pipeline name must be at least 2 characters long and can only include lowercase letters, numbers, and dashes. It should not start or end with a dash or dot. E.g. my-java-application-1`,
      })}
      label={'Pipeline name'}
      title={'Enter a unique and descriptive name for your deployment pipeline.'}
      placeholder={'Enter pipeline name'}
      control={control}
      errors={errors}
    />
  );
};
