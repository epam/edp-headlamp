import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
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
      InputProps,
      TextFieldProps,
      ...props
    }: FormTextFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const theme = useTheme();
    const [_partiallyDisabled, setPartiallyDisabled] = React.useState(true);

    const handleTogglePartiallyDisabled = () => {
      setPartiallyDisabled((prev) => !prev);
    };

    const hasError = !!errors[name];

    const _InputProps = React.useMemo(
      () => ({
        ...InputProps,
        endAdornment: (
          <Stack direction="row" spacing={1}>
            {title && (
              <InputAdornment position="end">
                <Tooltip title={title}>
                  <Icon icon={ICONS.INFO_CIRCLE} width={15} color={theme.palette.action.active} />
                </Tooltip>
              </InputAdornment>
            )}
            {!disabled && (
              <InputAdornment position="end">
                <IconButton size={'small'} onClick={handleTogglePartiallyDisabled}>
                  <Icon icon={_partiallyDisabled ? ICONS.PENCIL : ICONS.CROSS} />
                </IconButton>
              </InputAdornment>
            )}
          </Stack>
        ),
      }),
      [InputProps, _partiallyDisabled, disabled, theme.palette.action.active, title]
    );

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
                  disabled={disabled || _partiallyDisabled}
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
