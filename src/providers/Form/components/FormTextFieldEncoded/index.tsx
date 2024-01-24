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

export const FormTextFieldEncoded = React.forwardRef(
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

    const [hidden, setHidden] = React.useState<boolean>(true);

    const _InputProps = React.useMemo(
      () => ({
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size={'small'} onClick={() => setHidden((prev) => !prev)}>
              <Icon icon={hidden ? ICONS.PENCIL : ICONS.CROSS} />
            </IconButton>
          </InputAdornment>
        ),
      }),
      [InputProps, hidden]
    );

    const disabledInputRef = React.useRef(null);

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
                {!hidden ? (
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          error={hasError}
                          placeholder={placeholder}
                          inputRef={ref}
                          disabled={disabled}
                          InputProps={_InputProps}
                          {...field}
                          {...TextFieldProps}
                        />
                      );
                    }}
                    name={name}
                    defaultValue={defaultValue}
                    control={control}
                    {...props}
                  />
                ) : (
                  <TextField
                    error={hasError}
                    placeholder={placeholder}
                    inputRef={disabledInputRef}
                    disabled
                    value={'••••••••'}
                    InputProps={_InputProps}
                    {...TextFieldProps}
                  />
                )}
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
