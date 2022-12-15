import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormCheckbox, FormControlLabelWithTooltip } from '../../../FormComponents';
import { CodebaseAuthProps } from './types';

const { Grid } = MuiCore;

export const CodebaseAuth = ({ names, handleFormFieldChange }: CodebaseAuthProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormCheckbox
                {...register(names.hasCodebaseAuth.name, {
                    onChange: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={<FormControlLabelWithTooltip label={'Repository credentials'} />}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
