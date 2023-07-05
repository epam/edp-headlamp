import { ErrorMessage } from '@hookform/error-message';
import { FormControl, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Render } from '../../Render';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

export const FormTextField = React.forwardRef(
    (
        {
            name,
            label,
            title,
            control,
            defaultValue = '',
            errors,
            placeholder,
            disabled = false,
            InputProps,
            TextFieldProps,
            ...props
        }: FormTextFieldProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const hasError = !!errors[name];

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControlLabelWithTooltip label={label} title={title} />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FormControl fullWidth>
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            error={hasError}
                                            placeholder={placeholder}
                                            inputRef={ref}
                                            disabled={disabled}
                                            InputProps={InputProps}
                                            {...TextFieldProps}
                                            {...field}
                                        />
                                    )}
                                    name={name}
                                    defaultValue={defaultValue}
                                    control={control}
                                    {...props}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Render condition={hasError}>
                    <Grid item xs={12}>
                        <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                            <ErrorMessage errors={errors} name={name} />
                        </Typography>
                    </Grid>
                </Render>
            </Grid>
        );
    }
);
