import { ErrorMessage } from '@hookform/error-message';
import {
  ButtonBase,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useStyles } from './styles';
import { MainRadioGroupProps } from './types';

export const MainRadioGroup = React.forwardRef(
  (
    { name, control, errors, options, gridItemSize, ...props }: MainRadioGroupProps,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const hasError = !!errors[name];
    const classes = useStyles();

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormControl style={{ width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <RadioGroup {...field} row className={classes.radioGroup}>
                      <Grid container spacing={2}>
                        {options.map(
                          ({ value, label, description, icon, checkedIcon, disabled }, idx) => {
                            const isChecked = field.value === value;
                            const key = `${value}::${idx}`;

                            return (
                              <Grid item xs={gridItemSize}>
                                <ButtonBase
                                  key={key}
                                  className={clsx(classes.radioControlButton, {
                                    [classes.radioControlButtonActive]: isChecked,
                                  })}
                                  disabled={disabled}
                                >
                                  <FormControlLabel
                                    value={value}
                                    control={
                                      <Radio
                                        checked={isChecked}
                                        icon={
                                          <Stack direction="row" spacing={1} alignItems="center">
                                            {icon}
                                            <Typography
                                              variant={'h6'}
                                              component={'div'}
                                              align={'left'}
                                            >
                                              {label}
                                            </Typography>
                                          </Stack>
                                        }
                                        color={'primary'}
                                        checkedIcon={
                                          <Stack direction="row" spacing={1} alignItems="center">
                                            {checkedIcon}
                                            <Typography
                                              variant={'h6'}
                                              component={'div'}
                                              align={'left'}
                                            >
                                              {label}
                                            </Typography>
                                          </Stack>
                                        }
                                        disableRipple
                                        inputRef={ref}
                                      />
                                    }
                                    disabled={disabled}
                                    label={
                                      <Stack
                                        spacing={2}
                                        component={'span'}
                                        style={{
                                          height: description ? 'auto' : '100%',
                                        }}
                                        alignItems={description ? 'flex-start' : 'center'}
                                      >
                                        {!!description && (
                                          <Typography
                                            variant={'caption'}
                                            component={'div'}
                                            align={'left'}
                                          >
                                            {description}
                                          </Typography>
                                        )}
                                      </Stack>
                                    }
                                    className={classes.radioControlLabel}
                                  />
                                </ButtonBase>
                              </Grid>
                            );
                          }
                        )}
                      </Grid>
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
