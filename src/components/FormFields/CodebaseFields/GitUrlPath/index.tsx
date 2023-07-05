import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { GitUrlPathProps } from './types';

// relative path should always start with slash

const slashSymbol = '/';

export const GitUrlPath = ({ names, handleFormFieldChange }: GitUrlPathProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.gitUrlPath.name, {
                required: 'Enter relative path to repository.',
                pattern: {
                    value: /^.*$/,
                    message: 'Enter valid relative path to repository',
                },
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({
                        name,
                        value: value ? `${slashSymbol}${value}` : undefined,
                    }),
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
