import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, FormControl, FormControlLabel, Stack, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { rem } from '../../../../utils/styling/rem';
import { FormCheckboxProps } from './types';

export const FormCheckbox = React.forwardRef(
  (
    { name, label, control, errors, defaultValue = false, disabled, ...props }: FormCheckboxProps,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const hasError = !!errors[name];

    return (
      <Stack spacing={1}>
        <FormControl fullWidth>
          <Controller
            render={({ field: { value, ...fieldRest } }) => {
              return (
                <FormControlLabel
                  style={{ margin: 0 }}
                  control={
                    <Checkbox
                      {...fieldRest}
                      color={'primary'}
                      checked={!!value}
                      inputRef={ref}
                      onChange={(e) => fieldRest.onChange(e.target.checked)}
                      disabled={disabled}
                      sx={{ translate: '-9px 0' }}
                    />
                  }
                  label={
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: rem(2),
                      }}
                    >
                      {label}
                    </span>
                  }
                />
              );
            }}
            defaultValue={defaultValue}
            name={name}
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
