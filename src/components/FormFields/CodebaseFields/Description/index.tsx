import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../types/forms';
import { DescriptionProps } from './types';

export const Description = ({ names, handleFormFieldChange }: DescriptionProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const typeFieldValue = watch(names.type.name);

    return (
        <FormTextField
            {...register(names.description.name, {
                required: `Enter ${typeFieldValue} description`,
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange && handleFormFieldChange({ name, value }),
            })}
            label={'Description'}
            title={'Description'}
            placeholder={`Enter ${typeFieldValue} description`}
            control={control}
            errors={errors}
        />
    );
};
