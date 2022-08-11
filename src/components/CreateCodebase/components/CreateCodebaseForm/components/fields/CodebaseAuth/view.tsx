import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormCheckbox } from '../../../../../../FormComponents/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../FormComponents/FormControlLabelWithTooltip';
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
                    onChange: handleFormFieldChange,
                })}
                label={<FormControlLabelWithTooltip label={'Codebase Authentication'} />}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
