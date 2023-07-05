import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
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
