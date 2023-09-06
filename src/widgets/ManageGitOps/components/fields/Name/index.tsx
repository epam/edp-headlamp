import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { ManageGitOpsValues } from '../../../types';

const slashSymbol = '/';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitOpsValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FORM_NAMES.name.name)}
            label={'Repository Name'}
            control={control}
            errors={errors}
            InputProps={{
                startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
            }}
            disabled
        />
    );
};
