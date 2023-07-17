import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { TokenProps } from './types';

export const Token = ({ names, handleFormFieldChange }: TokenProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.token.name, {
                required: 'Enter your access token',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Access token'}
            control={control}
            errors={errors}
            TextFieldProps={{
                multiline: true,
                minRows: 4,
                maxRows: 4,
            }}
        />
    );
};
