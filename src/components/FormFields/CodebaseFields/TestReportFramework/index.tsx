import React from 'react';
import { useFormContext } from 'react-hook-form';
import { testReportFrameworkSelectOptions } from '../../../../configs/select-options/testReportFrameworks';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { TestReportFrameworkProps } from './types';

export const TestReportFramework = ({ names, handleFormFieldChange }: TestReportFrameworkProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.testReportFramework.name, {
                required: 'Select autotest report framework',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Autotest report framework'}
            placeholder={'Select autotest report framework'}
            control={control}
            errors={errors}
            options={testReportFrameworkSelectOptions}
        />
    );
};
