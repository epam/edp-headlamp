import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { CreateEditCDPipelineFormValues } from '../../../types';
import { PipelineNameProps } from './types';

export const PipelineName = ({ onPipelineNameChange }: PipelineNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditCDPipelineFormValues>();

    return (
        <FormTextField
            {...register(CDPIPELINE_FORM_NAMES.name.name, {
                required: `Pipeline name may contain only: lower-case letters, numbers and dashes
                                        and
                                        cannot start
                                        and end with dash and dot. Minimum 2 characters.
                                    `,
                onBlur: ({ target: { value } }: FieldEvent) => {
                    onPipelineNameChange(value);
                },
            })}
            label={'Pipeline name'}
            placeholder={'Enter pipeline name'}
            control={control}
            errors={errors}
        />
    );
};
