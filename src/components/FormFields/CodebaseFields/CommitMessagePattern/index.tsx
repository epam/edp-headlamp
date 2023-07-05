import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { CommitMessagePatternProps } from './types';

export const CommitMessagePattern = ({
    names,
    handleFormFieldChange,
    required = false,
}: CommitMessagePatternProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.commitMessagePattern.name, {
                required: required && 'Specify the pattern to validate a commit message',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Specify the pattern to validate a commit message'}
            placeholder={'^\\[PROJECT_NAME-\\d{4}\\]:.*'}
            control={control}
            errors={errors}
        />
    );
};
