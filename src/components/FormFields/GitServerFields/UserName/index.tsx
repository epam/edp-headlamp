import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { UserNameProps } from './types';

export const UserName = ({ names, handleFormFieldChange }: UserNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.gitUser.name, {
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'User'}
            title={`Git user name, usually "git"`}
            control={control}
            errors={errors}
        />
    );
};
