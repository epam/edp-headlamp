import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { PipelineNameProps } from './types';

export const PipelineName = ({
    names,
    handleFormFieldChange,
    onPipelineNameChange,
}: PipelineNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.name.name, {
                    required: `Pipeline name may contain only: lower-case letters, numbers and dashes
                                        and
                                        cannot start
                                        and end with dash and dot. Minimum 2 characters.
                                    `,
                    onBlur: ({ target: { name, value } }: FieldEvent) => {
                        handleFormFieldChange({ name, value });
                        onPipelineNameChange(value);
                    },
                })}
                label={'Pipeline name'}
                placeholder={'Enter pipeline name'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
