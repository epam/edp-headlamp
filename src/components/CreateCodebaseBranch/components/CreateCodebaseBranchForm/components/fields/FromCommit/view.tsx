import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { FromCommitProps } from './types';

const { Grid } = MuiCore;

export const FromCommit = ({ names, handleFormFieldChange }: FromCommitProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.fromCommit.name, {
                    onBlur: handleFormFieldChange,
                })}
                label={'From Commit Hash '}
                title={
                    'The new branch will be created starting from the selected commit hash. If this field is empty, the Default branch will be used.'
                }
                placeholder={'Enter Commit'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
