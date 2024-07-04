import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { FormAutocompleteProps } from './types';

export const FormAutocomplete = <T,>(props: FormAutocompleteProps<T>) => {
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
          <Icon icon={ICONS.INFO_CIRCLE} width={18} color={theme.palette.action.active} />
        </Tooltip>
      ),
    };
  }, [InputProps, theme.palette.action.active, title]);

  const hasError = !!errors[name];

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Autocomplete
              {...AutocompleteProps}
              multiple
              autoComplete
              options={options}
              disabled={disabled}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props} style={{ height: '36px' }}>
                    <Checkbox
                      icon={
                        <Icon
                          icon={'icons8:plus'}
                          width={24}
                          height={24}
                          color={theme.palette.action.active}
                        />
                      }
                      checkedIcon={
                        <Icon
                          icon={ICONS.CHECK}
                          width={24}
                          height={24}
                          color={theme.palette.primary.main}
                        />
                      }
                      style={{
                        color: selected ? theme.palette.primary.main : theme.palette.text.primary,
                      }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...TextFieldProps}
                  InputProps={{
                    ...params.InputProps,
                    ..._InputProps,
                    endAdornment: (
                      <Stack direction="row" alignItems="center" sx={{ pt: '2px' }}>
                        {params.InputProps.endAdornment}
                        {_InputProps.endAdornment}
                      </Stack>
                    ),
                  }}
                  variant="standard"
                  label={label}
                  fullWidth
                  style={{ marginTop: 0 }}
                  placeholder={placeholder}
                />
              )}
              renderTags={(value, getTagProps) => {
                const numTags = value.length;
                const limitTags = 5;

                return (
                  <>
                    {value.slice(0, limitTags).map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={index}
                        label={option}
                        color="primary"
                        size="small"
                      />
                    ))}

                    {numTags > limitTags && ` +${numTags - limitTags}`}
                  </>
                );
              }}
              {...field}
              onChange={(e, data) => {
                field.onChange(data);
              }}
              value={field.value || []}
            />
          )}
          {...otherProps}
        />
      </FormControl>
      {hasError && (
        <Typography component={'span'} variant={'subtitle2'} color={'error'}>
          <ErrorMessage errors={errors} name={name} />
        </Typography>
      )}
    </Stack>
  );
};
