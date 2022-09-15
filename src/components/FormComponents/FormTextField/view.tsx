import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import { MuiCore, React } from '../../../plugin.globals';
import { Render } from '../../Render';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

const { FormControl, TextField, Typography, Grid } = MuiCore;

export const FormTextField = React.forwardRef(
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
            ...props
        }: FormTextFieldProps,
        ref: React.RefObject<HTMLInputElement>
    ): React.ReactElement => {
        const hasError = !!errors[name];

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Render condition={!!label && !!title}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                        </Render>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            error={hasError}
                                            placeholder={placeholder}
                                            inputRef={ref}
                                            disabled={disabled}
                                            {...field}
                                        />
                                    )}
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
