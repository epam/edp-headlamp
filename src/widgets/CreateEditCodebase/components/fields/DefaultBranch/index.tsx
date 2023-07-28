import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const DefaultBranch = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.defaultBranch.name, {
                required: 'Enter a new or existing branch name',
                pattern: {
                    value: /^[a-z0-9][a-z0-9\/\-\.]*[a-z0-9]$/,
                    message: 'Enter valid default branch name',
                },
            })}
            label={'Default branch'}
            title={'Enter a new or existing branch name'}
            placeholder={'Enter the default branch name'}
            control={control}
            errors={errors}
        />
    );
};
