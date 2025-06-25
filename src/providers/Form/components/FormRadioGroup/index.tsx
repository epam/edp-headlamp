import { ErrorMessage } from '@hookform/error-message';
import {
  ButtonBase,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { useStyles } from './styles';
import { FormRadioProps } from './types';

export const FormRadioGroup = React.forwardRef(
  (
    {
      name,
      control,
      errors,
      label,
      title,
      options,
      disabled = false,
      onChange,
      ...props
    }: FormRadioProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const hasError = !!errors[name];
    const classes = useStyles();

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <FormControl>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControlLabelWithTooltip label={label} title={title} />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      className={classes.radioGroup}
                      onChange={(e) => {
                        field.onChange(e);
                        onChange?.(e.target.value);
                      }}
                    >
                      {options.map(
                        (
                          {
                            value,
                            label,
                            icon,
                            checkedIcon,
                            disabled: optionDisabled,
                            disabledTooltip,
                          },
                          idx
                        ) => {
                          const isChecked = field.value === value;
                          const key = `${value}::${idx}`;
                          return (
                            <ConditionalWrapper
                              condition={!!disabledTooltip}
                              wrapper={(children) => (
                                <Tooltip key={key} title={disabledTooltip}>
                                  <div>{children}</div>
                                </Tooltip>
                              )}
                              key={key}
                            >
                              <ButtonBase
                                className={clsx(classes.radioControlButton, {
                                  [classes.radioControlButtonActive]: isChecked,
                                })}
                                disabled={disabled || optionDisabled}
                              >
                                <FormControlLabel
                                  value={value}
                                  control={
                                    <Radio
                                      color={'primary'}
                                      checked={isChecked}
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      disableRipple
                                      inputRef={ref}
                                    />
                                  }
                                  className={clsx(classes.radioControlLabel, {
                                    [classes.radioControlLabelDisabled]: disabled || optionDisabled,
                                  })}
                                  label={label}
                                />
                              </ButtonBase>
                            </ConditionalWrapper>
                          );
                        }
                      )}
                    </RadioGroup>
                  )}
                  control={control}
                  name={name}
                  {...props}
                />
              </Grid>
            </Grid>
          </FormControl>
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
