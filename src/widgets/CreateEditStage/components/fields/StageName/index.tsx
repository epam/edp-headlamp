import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';
import { StageNameProps } from './types';

export const StageName = ({ otherStagesNames }: StageNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateEditStageFormValues>();

    return (
        <FormTextField
            {...register(STAGE_FORM_NAMES.name.name, {
                required: `Enter stage name`,
                validate: name => {
                    if (otherStagesNames.includes(name)) {
                        return `"${name}" has been already added to the stages that will be created`;
                    }
                },
            })}
            label={'Stage name'}
            title={`Stage name may contain only: lower-case letters, numbers and dashes and cannot start and end
                            with dash. Minimum 2 characters.
                        `}
            placeholder={'Enter stage name'}
            control={control}
            errors={errors}
        />
    );
};
