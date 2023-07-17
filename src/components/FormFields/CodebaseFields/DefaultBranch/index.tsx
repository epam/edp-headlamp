import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { DefaultBranchProps } from './types';

export const DefaultBranch = ({ names, handleFormFieldChange }: DefaultBranchProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.defaultBranch.name, {
                required: 'Enter a new or existing branch name',
                pattern: {
                    value: /^[a-z0-9][a-z0-9\/\-\.]*[a-z0-9]$/,
                    message: 'Enter valid default branch name',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange && handleFormFieldChange({ name, value }),
            })}
            label={'Default branch'}
            title={'Enter a new or existing branch name'}
            placeholder={'Enter the default branch name'}
            control={control}
            errors={errors}
        />
    );
};
