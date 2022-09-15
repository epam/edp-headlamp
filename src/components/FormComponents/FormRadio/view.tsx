import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { MuiCore, React } from '../../../plugin.globals';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { useStyles } from './styles';
import { FormRadioProps } from './types';

const { FormControl, Radio, ButtonBase, RadioGroup, Typography, Grid, FormControlLabel } = MuiCore;

export const FormRadio = React.forwardRef(
    (
        { name, control, errors, label, title, options, ...props }: FormRadioProps,
        ref: React.RefObject<HTMLInputElement>
    ): React.ReactElement => {
        const classes = useStyles();

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => (
                                        <RadioGroup {...field} row className={classes.radioGroup}>
                                            {options.map(
                                                ({ value, label, icon, checkedIcon }, idx) => {
                                                    const isChecked = field.value === value;
                                                    const key = `${value}::${idx}`;

                                                    return (
                                                        <ButtonBase
                                                            key={key}
                                                            className={clsx(
                                                                classes.radioControlButton,
                                                                {
                                                                    [classes.radioControlButtonActive]:
                                                                        isChecked,
                                                                }
                                                            )}
                                                        >
                                                            <FormControlLabel
                                                                value={value}
                                                                control={
                                                                    <Radio
                                                                        checked={isChecked}
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        disableRipple
                                                                        inputRef={ref}
                                                                    />
                                                                }
                                                                label={label}
                                                                className={
                                                                    classes.radioControlLabel
                                                                }
                                                            />
                                                        </ButtonBase>
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
                <Grid item xs={12}>
                    <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                        <ErrorMessage errors={errors} name={name} />
                    </Typography>
                </Grid>
            </Grid>
        );
    }
);
