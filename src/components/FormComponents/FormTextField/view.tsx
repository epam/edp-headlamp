import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import { MuiCore, React } from '../../../plugin.globals';
import { Render } from '../../Render';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

const { FormControl, InputAdornment, TextField, Typography, Grid } = MuiCore;

export const FormTextField = ({
    name,
    label,
    title,
    control,
    defaultValue = '',
    errors,
    placeholder,
    ...props
}: FormTextFieldProps): React.ReactElement => {
    const hasError = errors[name];

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Render condition={!!label && !!title}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControlLabelWithTooltip label={label} title={title} />
                        </Grid>
                    </Grid>
                </Render>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    error={hasError}
                                    placeholder={placeholder}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                style={{ marginRight: 0 }}
                                            />
                                        ),
                                    }}
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
            <Render condition={!!hasError}>
                <Grid item xs={12}>
                    <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                        <ErrorMessage errors={errors} name={name} />
                    </Typography>
                </Grid>
            </Render>
        </Grid>
    );
};
