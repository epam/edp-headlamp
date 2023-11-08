import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

export const FormTextFieldEditable = React.forwardRef(
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
            showLabelPlaceholder = false,
            InputProps,
            TextFieldProps,
            ...props
        }: FormTextFieldProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const [_partiallyDisabled, setPartiallyDisabled] = React.useState(true);
        const hasError = !!errors[name];

        const _InputProps = React.useMemo(
            () => ({
                ...InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size={'small'} onClick={() => setPartiallyDisabled(false)}>
                            <Icon icon={ICONS.PENCIL} />
                        </IconButton>
                    </InputAdornment>
                ),
            }),
            [InputProps]
        );

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        {(!!label || showLabelPlaceholder) && (
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                        )}
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FormControl fullWidth>
                                <Controller
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                error={hasError}
                                                placeholder={placeholder}
                                                inputRef={ref}
                                                disabled={disabled || _partiallyDisabled}
                                                InputProps={_InputProps}
                                                {...TextFieldProps}
                                                {...field}
                                            />
                                        );
                                    }}
                                    name={name}
                                    defaultValue={defaultValue}
                                    control={control}
                                    {...props}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                {hasError && (
                    <Grid item xs={12}>
                        <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                            <ErrorMessage errors={errors} name={name} />
                        </Typography>
                    </Grid>
                )}
            </Grid>
        );
    }
);
