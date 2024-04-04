import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
  Box,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useStyles } from './styles';
import { FormSelectProps } from './types';

export const FormSelect = React.forwardRef(
  (
    {
      name,
      label,
      title,
      control,
      defaultValue = '',
      options = [],
      errors,
      disabled,
      ...props
    }: FormSelectProps,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const theme = useTheme();

    const hasError = !!errors[name];
    const classes = useStyles();

    const getOptionValue = React.useCallback(
      (optionValue) => {
        if (options.length) {
          const [foundOptionByName] = options.filter(({ value }) => value === optionValue);
          if (foundOptionByName) {
            return foundOptionByName.icon ? (
              <Stack spacing={2} direction="row" alignItems="center">
                <ListItemIcon sx={{ minWidth: 0 }}>{foundOptionByName.icon}</ListItemIcon>
                <ListItemText>{foundOptionByName.label}</ListItemText>
              </Stack>
            ) : (
              foundOptionByName.label
            );
          }
        }
        return defaultValue;
      },
      [defaultValue, options]
    );

    return (
      <Stack spacing={1}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Controller
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  inputRef={ref}
                  error={hasError}
                  displayEmpty
                  disabled={disabled}
                  fullWidth
                  renderValue={(value) => (value !== '' ? getOptionValue(value) : label)}
                  className={clsx({
                    [classes.selectWithDefaultValue]: field.value === '',
                  })}
                  endAdornment={
                    title && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          right: theme.typography.pxToRem(24),
                          lineHeight: 0,
                        }}
                      >
                        <Tooltip title={title}>
                          <Icon
                            icon={ICONS.INFO_CIRCLE}
                            width={18}
                            color={theme.palette.action.active}
                          />
                        </Tooltip>
                      </Box>
                    )
                  }
                >
                  {options.map(({ label, value, disabled = false, icon }, idx) => {
                    const key = `${label}::${idx}`;

                    return (
                      <MenuItem value={value} key={key} disabled={disabled}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText>{label}</ListItemText>
                      </MenuItem>
                    );
                  })}
                </Select>
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
