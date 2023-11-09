import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { isBase64String } from '../../../../utils/checks/isBase64String';
import { safeDecode, safeEncode } from '../../../../utils/decodeEncode';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { FormTextFieldProps } from './types';

const getValue = (value: string, toDecode: boolean) => {
    if (!value) {
        return value;
    }

    const isBase64 = isBase64String(value);

    if (toDecode) {
        return isBase64 ? safeDecode(value) : value;
    } else {
        return isBase64 ? value : safeEncode(value);
    }
};

export const FormTextFieldDecodeable = React.forwardRef(
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
            showLabelPlaceholder = false,
            InputProps,
            TextFieldProps,
            ...props
        }: FormTextFieldProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const hasError = !!errors[name];

        const {
            setValue,
            watch,
            formState: { isSubmitting },
        } = useFormContext();

        const [toDecode, setToDecode] = React.useState<boolean>(false);

        const fieldValue = watch(name);

        const handleToggleDecoded = React.useCallback(() => {
            setToDecode(prev => {
                const newToDecodeValue = !prev;
                const newValue = getValue(fieldValue, newToDecodeValue);
                setValue(name, newValue);

                return newToDecodeValue;
            });
        }, [fieldValue, name, setValue]);

        const handleSetToDecodeToFalse = React.useCallback(() => {
            const newToDecodeValue = false;
            const newValue = getValue(fieldValue, newToDecodeValue);
            setValue(name, newValue);
            setToDecode(newToDecodeValue);
        }, [fieldValue, name, setValue]);

        const _InputProps = React.useMemo(
            () => ({
                ...InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size={'small'} onClick={handleToggleDecoded}>
                            <Icon icon={toDecode ? ICONS.CROSS : ICONS.PENCIL} />
                        </IconButton>
                    </InputAdornment>
                ),
            }),
            [InputProps, handleToggleDecoded, toDecode]
        );

        React.useEffect(() => {
            if (isSubmitting) {
                handleSetToDecodeToFalse();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isSubmitting]);

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        {(!!label || showLabelPlaceholder) && (
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                        )}
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FormControl fullWidth>
                                <Controller
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                error={hasError}
                                                placeholder={placeholder}
                                                inputRef={ref}
                                                disabled={disabled || !toDecode}
                                                InputProps={_InputProps}
                                                {...field}
                                                {...TextFieldProps}
                                            />
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
