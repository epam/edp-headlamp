import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import { MuiCore, React } from '../../../plugin.globals';
import { rem } from '../../../utils/styling/rem';
import { Render } from '../../Render';
import { FormCheckboxProps } from './types';

const { FormControl, Checkbox, Typography, Grid, FormControlLabel } = MuiCore;

export const FormCheckbox = React.forwardRef(
    (
        { name, label, control, errors, disabled, ...props }: FormCheckboxProps,
        ref: React.RefObject<HTMLInputElement>
    ): React.ReactElement => {
        const hasError = !!errors[name];

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl>
                        <Controller
                            render={({ field }) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                color={'primary'}
                                                checked={!!field.value}
                                                inputRef={ref}
                                                onChange={e => field.onChange(e.target.checked)}
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
                            defaultValue={false}
                            name={name}
                            control={control}
                            {...props}
                        />
                    </FormControl>
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
