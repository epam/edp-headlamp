import { Icon } from '@iconify/react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  FormControl,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Controller, Path, PathValue } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SelectOption } from '../../../../types/forms';
import { FormAutocompleteSingleProps } from './types';

const FormAutocompleteSingleInner = React.forwardRef(
  <
    TOption extends SelectOption = SelectOption,
    TFormValues extends Record<string, unknown> = Record<string, unknown>
  >(
    {
      name,
      label,
      tooltipText,
      control,
      defaultValue,
      errors,
      placeholder,
      disabled = false,
      options,
      TextFieldProps = {},
      AutocompleteProps,
      ...props
    }: FormAutocompleteSingleProps<TOption, TFormValues>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const theme = useTheme();
    const error = errors[name];
    const hasError = !!error;
    const errorMessage = error?.message as string;
    const helperText = hasError ? errorMessage : TextFieldProps?.helperText;

    const createMergedInputProps = React.useCallback(
      (inputParams: AutocompleteRenderInputParams) => {
        const originalInputProps = TextFieldProps.InputProps ?? {};
        const userEndAdornment = originalInputProps.endAdornment;
        const autocompleteInputProps = inputParams.InputProps ?? {};

        return {
          ...originalInputProps,
          ...autocompleteInputProps,
          endAdornment: (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {autocompleteInputProps.endAdornment}
              {userEndAdornment}
              {tooltipText && (
                <Tooltip title={tooltipText}>
                  <Icon icon={ICONS.INFO} color={theme.palette.action.active} />
                </Tooltip>
              )}
            </Stack>
          ),
        };
      },
      [TextFieldProps.InputProps, theme.palette.action.active, tooltipText]
    );

    return (
      <Stack spacing={1}>
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as PathValue<TFormValues, Path<TFormValues>>}
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
                      inputRef={ref}
                      InputProps={createMergedInputProps(params)}
                      variant="standard"
                      label={label}
                      fullWidth
                      style={{ marginTop: 0 }}
                      placeholder={placeholder}
                      error={hasError || !!TextFieldProps?.error}
                      helperText={helperText}
                    />
                  )}
                  isOptionEqualToValue={(option, value) => {
                    return option.value === value.value;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (typeof option === 'object' && 'label' in option) {
                      return option.label || '';
                    }

                    return '';
                  }}
                  onChange={(_event, newValue) => {
                    if (typeof newValue === 'string') {
                      field.onChange(newValue);
                    } else if (newValue && typeof newValue === 'object' && 'value' in newValue) {
                      field.onChange(newValue.value || '');
                    } else {
                      field.onChange('');
                    }
                  }}
                  onInputChange={(_event, newInputValue) => {
                    if (AutocompleteProps?.freeSolo) {
                      field.onChange(newInputValue || '');
                    }
                  }}
                  value={options.find((option) => option.value === field.value) || null}
                  forcePopupIcon
                />
              );
            }}
            {...props}
          />
        </FormControl>
      </Stack>
    );
  }
);

FormAutocompleteSingleInner.displayName = 'FormAutocompleteSingle';

export const FormAutocompleteSingle = FormAutocompleteSingleInner as <
  TOption extends SelectOption = SelectOption,
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>(
  props: FormAutocompleteSingleProps<TOption, TFormValues> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => React.JSX.Element;
