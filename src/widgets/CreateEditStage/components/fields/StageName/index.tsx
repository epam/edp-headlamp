import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../types';
import { StageNameProps } from './types';

const nameRequirementLabel = `Name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const StageName = ({ otherStagesNames }: StageNameProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
    } = useFormContext<CreateEditStageFormValues>();

    const {
        forwardedProps: { CDPipelineData },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    const namespace = CDPipelineData.metadata.namespace || getDefaultNamespace();
    const CDPipelineName = CDPipelineData.metadata.name;

    return (
        <FormTextField
            {...register(STAGE_FORM_NAMES.name.name, {
                required: `Enter stage name`,
                pattern: {
                    value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
                    message: nameRequirementLabel,
                },
                onChange: ({ target: { value } }: FieldEvent) => {
                    setValue(
                        STAGE_FORM_NAMES.deployNamespace.name,
                        `${namespace}-${CDPipelineName}-${value}`
                    );
                },
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
