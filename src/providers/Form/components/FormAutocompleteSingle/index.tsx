import { Icon } from '@iconify/react';
import { Autocomplete, FormControl, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SelectOption } from '../../../../types/forms';
import { FormAutocompleteSingleProps } from './types';

export const FormAutocompleteSingle = <T extends SelectOption>(
  props: FormAutocompleteSingleProps<T>
) => {
  const {
    name,
    label,
    title,
    control,
    defaultValue,
    errors,
    placeholder,
    disabled = false,
    InputProps = {},
    options,
    TextFieldProps,
    AutocompleteProps,
    ...otherProps
  } = props;

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

  const error = errors[name];
  const hasError = !!errors[name];
  const errorMessage = error?.message as string;
  const helperText = hasError ? errorMessage : TextFieldProps?.helperText;

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Autocomplete
              {...AutocompleteProps}
              options={options}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...TextFieldProps}
                  InputProps={{
                    ...params.InputProps,
                    ..._InputProps,
                    endAdornment: (
                      <Stack direction="row" alignItems="center" sx={{ pt: '2px' }}>
                        {_InputProps.endAdornment}
                        {TextFieldProps?.InputProps?.endAdornment}
                        {params.InputProps.endAdornment}
                      </Stack>
                    ),
                  }}
                  variant="standard"
                  label={label}
                  fullWidth
                  style={{ marginTop: 0 }}
                  placeholder={placeholder}
                  error={hasError || !!TextFieldProps?.error}
                  helperText={helperText}
                />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label || ''}
              onChange={(event, newValue) => {
                field.onChange(newValue ? newValue.value : '');
              }}
              value={options.find((option) => option.value === field.value) || null}
            />
          );
        }}
        {...otherProps}
      />
    </FormControl>
  );
};
