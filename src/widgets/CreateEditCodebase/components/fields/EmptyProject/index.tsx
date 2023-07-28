import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const EmptyProject = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormCheckbox
            {...register(CODEBASE_FORM_NAMES.emptyProject.name)}
            label={
                <FormControlLabelWithTooltip
                    label={'Empty project'}
                    title={
                        'An empty project does not contain any template code. However, EDP pipelines and deployment templates will be created'
                    }
                />
            }
            control={control}
            errors={errors}
        />
    );
};
