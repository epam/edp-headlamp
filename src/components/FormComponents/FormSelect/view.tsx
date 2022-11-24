import { ErrorMessage } from '@hookform/error-message';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { MuiCore, React } from '../../../plugin.globals';
import { Render } from '../../Render';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { useStyles } from './styles';
import { FormSelectProps } from './types';

const { FormControl, Select, MenuItem, Typography } = MuiCore;

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
            placeholder,
            disabled,
            ...props
        }: FormSelectProps,
        ref: React.RefObject<HTMLInputElement>
    ): React.ReactElement => {
        const hasError = !!errors[name];
        const classes = useStyles();

        const getOptionValue = React.useCallback(
            optionValue => {
                if (options.length) {
                    const [foundOptionByName] = options.filter(
                        ({ value }) => value === optionValue
                    );
                    if (foundOptionByName) {
                        return foundOptionByName.label;
                    }
                }
                return defaultValue;
            },
            [defaultValue, options]
        );

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Render condition={!!label || !!title}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                        </Render>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                inputRef={ref}
                                                error={hasError}
                                                displayEmpty
                                                disabled={disabled}
                                                renderValue={value =>
                                                    value !== ''
                                                        ? getOptionValue(value)
                                                        : placeholder
                                                }
                                                className={clsx({
                                                    [classes.selectWithDefaultValue]:
                                                        field.value === '',
                                                })}
                                            >
                                                {options.map(
                                                    ({ label, value, disabled = false }, idx) => {
                                                        const key = `${label}::${idx}`;

                                                        return (
                                                            <MenuItem
                                                                value={value}
                                                                key={key}
                                                                disabled={disabled}
                                                            >
                                                                {label}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
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
                <Render condition={hasError}>
                    <Grid item xs={12}>
                        <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                            <ErrorMessage errors={errors} name={name} />
                        </Typography>
                    </Grid>
                </Render>
            </Grid>
        );
    }
);
