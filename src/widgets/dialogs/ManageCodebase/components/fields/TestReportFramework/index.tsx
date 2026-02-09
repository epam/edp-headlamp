import React from 'react';
import { testReportFrameworkSelectOptions } from '../../../../../../configs/select-options/testReportFrameworks';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const TestReportFramework = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.testReportFramework.name, {
        required: 'Select autotest report framework',
      })}
      label={'Autotest report framework'}
      control={control}
      errors={errors}
      options={testReportFrameworkSelectOptions}
    />
  );
};
