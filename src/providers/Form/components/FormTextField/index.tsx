import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import { FormControl, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
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
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const theme = useTheme();

    const _InputProps = React.useMemo(() => {
      return {
        ...InputProps,
        endAdornment: title && (
          <Tooltip title={title}>
            <Icon icon={ICONS.INFO_CIRCLE} width={15} color={theme.palette.action.active} />
          </Tooltip>
        ),
      };
    }, [InputProps, theme.palette.action.active, title]);

    const hasError = !!errors[name];

    return (
      <Stack spacing={1}>
        <FormControl fullWidth>
          <Controller
            render={({ field }) => {
              return (
                <TextField
                  error={hasError}
                  placeholder={placeholder}
                  inputRef={ref}
                  disabled={disabled}
                  InputProps={_InputProps}
                  label={label}
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
        {hasError && (
          <Typography component={'span'} variant={'subtitle2'} color={'error'}>
            <ErrorMessage errors={errors} name={name} />
          </Typography>
        )}
      </Stack>
    );
  }
);
