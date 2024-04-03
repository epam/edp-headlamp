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

export const FormTextFieldPassword = React.forwardRef(
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
    const theme = useTheme();
    const hasError = !!errors[name];
    const [_type, setType] = React.useState('password');

    const handleToggleType = () => {
      setType((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    const _InputProps = React.useMemo(
      () => ({
        ...InputProps,
        endAdornment: (
          <Stack direction="row" spacing={1}>
            {title && (
              <InputAdornment position="end">
                <Tooltip title={title}>
                  <Icon icon={ICONS.INFO_CIRCLE} width={18} color={theme.palette.action.active} />
                </Tooltip>
              </InputAdornment>
            )}
            <InputAdornment position="end">
              <IconButton size={'small'} onClick={handleToggleType}>
                <Icon icon={_type === 'text' ? ICONS.EYE : ICONS.CROSSED_EYE} />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        type: _type,
      }),
      [InputProps, _type, theme.palette.action.active, title]
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
                  label={label}
                  disabled={disabled}
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
        {hasError && (
          <Typography component={'span'} variant={'subtitle2'} color={'error'}>
            <ErrorMessage errors={errors} name={name} />
          </Typography>
        )}
      </Stack>
    );
  }
);
