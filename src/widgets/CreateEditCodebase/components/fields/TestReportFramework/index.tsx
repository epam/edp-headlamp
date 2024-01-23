import React from 'react';
import { useFormContext } from 'react-hook-form';
import { testReportFrameworkSelectOptions } from '../../../../../configs/select-options/testReportFrameworks';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const TestReportFramework = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.testReportFramework.name, {
        required: 'Select autotest report framework',
      })}
      label={'Autotest report framework'}
      placeholder={'Select autotest report framework'}
      control={control}
      errors={errors}
      options={testReportFrameworkSelectOptions}
    />
  );
};
