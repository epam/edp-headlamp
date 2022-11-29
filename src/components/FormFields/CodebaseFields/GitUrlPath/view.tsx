import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { GitUrlPathProps } from './types';

const { Grid, InputAdornment } = MuiCore;

// relative path should always start with slash

const slashSymbol = '/';

export const GitUrlPath = ({ names, handleFormFieldChange }: GitUrlPathProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.gitUrlPath.name, {
                    required: 'Enter relative path to repository.',
                    pattern: {
                        value: /^.*$/,
                        message: 'Enter valid relative path to repository',
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({
                            name,
                            value: value ? `${slashSymbol}${value}` : undefined,
                        }),
                })}
                label={'Relative path'}
                placeholder={
                    'First type a forward slash "/", then type the relative path to the repository'
                }
                control={control}
                errors={errors}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
                }}
            />
        </Grid>
    );
};
