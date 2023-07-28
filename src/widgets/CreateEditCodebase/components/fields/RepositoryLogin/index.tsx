import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const RepositoryLogin = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.repositoryLogin.name, {
                required: 'Enter repository login',
                pattern: {
                    value: /\w/,
                    message: 'Enter valid repository login',
                },
            })}
            label={'Repository login'}
            placeholder={'Enter repository login'}
            control={control}
            errors={errors}
        />
    );
};
