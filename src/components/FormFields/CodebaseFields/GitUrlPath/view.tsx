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
                    required: 'Specify relative path to repository.',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({
                            name,
                            value: value ? `${slashSymbol}${value}` : undefined,
                        }),
                })}
                label={'Relative path'}
                title={'Specify relative path to repository.'}
                placeholder={'Enter repository path'}
                control={control}
                errors={errors}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
                }}
            />
        </Grid>
    );
};
