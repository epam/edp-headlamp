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
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

export const FormTextField = React.forwardRef(
    (
        {
            name,
            label,
            title,
            control,
            defaultValue = undefined,
            errors,
            placeholder,
            disabled = false,
            showLabelPlaceholder = false,
            partiallyDisabled = false,
            InputProps,
            TextFieldProps,
            ...props
        }: FormTextFieldProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const [_partiallyDisabled, setPartiallyDisabled] = React.useState(partiallyDisabled);
        const hasError = !!errors[name];

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Render condition={!!label || showLabelPlaceholder}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                        </Render>
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
                                                InputProps={{
                                                    ...InputProps,
                                                    ...(_partiallyDisabled
                                                        ? {
                                                              endAdornment: (
                                                                  <InputAdornment position="end">
                                                                      <IconButton
                                                                          size={'small'}
                                                                          onClick={() =>
                                                                              setPartiallyDisabled(
                                                                                  false
                                                                              )
                                                                          }
                                                                      >
                                                                          <Icon
                                                                              icon={ICONS.PENCIL}
                                                                          />
                                                                      </IconButton>
                                                                  </InputAdornment>
                                                              ),
                                                          }
                                                        : {}),
                                                }}
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
