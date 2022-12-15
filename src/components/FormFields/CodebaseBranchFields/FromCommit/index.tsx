import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
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
                    pattern: {
                        value: /\b([a-f0-9]{40})\b/,
                        message: 'Enter valid commit hash',
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
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
