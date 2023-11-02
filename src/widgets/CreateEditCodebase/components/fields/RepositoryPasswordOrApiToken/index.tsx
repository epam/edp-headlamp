import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const RepositoryPasswordOrApiToken = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.repositoryPasswordOrApiToken.name, {
                required: 'Enter the repository password or access token',
                pattern: {
                    value: /\w/,
                    message: 'Enter valid repository password or api token',
                },
            })}
            label={'Repository password or access token'}
            placeholder={'Enter the repository password or access token'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'password',
            }}
        />
    );
};
