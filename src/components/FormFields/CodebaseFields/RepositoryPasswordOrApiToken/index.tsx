import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { RepositoryPasswordOrApiTokenProps } from './types';

export const RepositoryPasswordOrApiToken = ({
    names,
    handleFormFieldChange,
}: RepositoryPasswordOrApiTokenProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.repositoryPasswordOrApiToken.name, {
                required: 'Enter the repository password or access token',
                pattern: {
                    value: /\w/,
                    message: 'Enter valid repository password or api token',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Repository password or access token'}
            placeholder={'Enter the repository password or access token'}
            control={control}
            errors={errors}
        />
    );
};
