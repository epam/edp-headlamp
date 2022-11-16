import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { DefaultBranchProps } from './types';

const { Grid } = MuiCore;

export const DefaultBranch = ({ names, handleFormFieldChange }: DefaultBranchProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.defaultBranch.name, {
                    required: 'Default branch to create/use',
                    pattern: {
                        value: /^[a-z0-9][a-z0-9\/\-\.]*[a-z0-9]$/,
                        message: 'Please enter valid default branch name',
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Default branch'}
                title={'Default branch to create/use'}
                placeholder={'Type default branch name'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
