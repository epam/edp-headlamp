import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { HTTPSPortProps } from './types';

export const HTTPSPort = ({ names, handleFormFieldChange }: HTTPSPortProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.httpsPort.name, {
                required: 'Enter HTTPS port',
                pattern: {
                    value: /^(\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    message: 'Enter correct https port',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'HTTPS port'}
            placeholder={'Enter HTTPS port'}
            control={control}
            errors={errors}
            TextFieldProps={{
                type: 'number',
            }}
        />
    );
};
