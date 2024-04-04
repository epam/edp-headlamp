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
            render={({ field }) => {
              return (
                <FormControlLabel
                  style={{ margin: 0 }}
                  control={
                    <Checkbox
                      {...field}
                      color={'primary'}
                      checked={!!field.value}
                      inputRef={ref}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={disabled}
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
