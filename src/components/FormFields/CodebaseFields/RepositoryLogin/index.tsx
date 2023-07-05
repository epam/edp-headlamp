import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { RepositoryLoginProps } from './types';

export const RepositoryLogin = ({ names, handleFormFieldChange }: RepositoryLoginProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.repositoryLogin.name, {
                required: 'Enter repository login',
                pattern: {
                    value: /\w/,
                    message: 'Enter valid repository login',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Repository login'}
            placeholder={'Enter repository login'}
            control={control}
            errors={errors}
        />
    );
};
