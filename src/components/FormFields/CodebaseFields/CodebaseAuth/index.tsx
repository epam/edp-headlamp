import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormCheckbox, FormControlLabelWithTooltip } from '../../../FormComponents';
import { CodebaseAuthProps } from './types';

export const CodebaseAuth = ({ names, handleFormFieldChange }: CodebaseAuthProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormCheckbox
            {...register(names.hasCodebaseAuth.name, {
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={<FormControlLabelWithTooltip label={'Repository credentials'} />}
            control={control}
            errors={errors}
        />
    );
};
