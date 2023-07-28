import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFromTemplateFormValues } from '../../../types';

const slashSymbol = '/';

export const GitUrlPath = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

    return (
        <FormTextField
            {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name, {
                required: 'Enter relative path to repository.',
                pattern: {
                    value: /^.*$/,
                    message: 'Enter valid relative path to repository',
                },
            })}
            label={'Git repo relative path'}
            placeholder={
                'Indicate the repository relative path in the following format project/repository'
            }
            control={control}
            errors={errors}
            InputProps={{
                startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
            }}
        />
    );
};
