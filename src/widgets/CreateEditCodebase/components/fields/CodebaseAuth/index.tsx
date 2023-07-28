import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const CodebaseAuth = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    return (
        <FormCheckbox
            {...register(CODEBASE_FORM_NAMES.hasCodebaseAuth.name)}
            label={<FormControlLabelWithTooltip label={'Repository credentials'} />}
            control={control}
            errors={errors}
        />
    );
};
