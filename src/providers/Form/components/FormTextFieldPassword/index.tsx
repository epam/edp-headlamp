import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
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
      showLabelPlaceholder = false,
      InputProps,
      TextFieldProps,
      ...props
    }: FormTextFieldProps,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const hasError = !!errors[name];
    const [_type, setType] = React.useState('password');

    const handleToggleType = () => {
      setType((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    const _InputProps = React.useMemo(
      () => ({
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size={'small'} onClick={handleToggleType}>
              <Icon icon={_type === 'text' ? ICONS.EYE : ICONS.CROSSED_EYE} />
            </IconButton>
          </InputAdornment>
        ),
        type: _type,
      }),
      [InputProps, _type]
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
