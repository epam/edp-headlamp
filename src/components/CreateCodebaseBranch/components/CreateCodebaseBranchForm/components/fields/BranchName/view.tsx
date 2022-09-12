import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../types/forms';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { BranchNameProps } from './types';

const { Grid } = MuiCore;

export const BranchName = ({ names, handleFormFieldChange }: BranchNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.branchName.name, {
                    required: `Branch name may contain only: lower-case letters, numbers, slashes, dashes and dots.
                                Can start and end only with lower-case letters and numbers. Minimum 2 characters.
                            `,
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Branch Name'}
                title={'Type the branch name that will be created in the Version Control System.'}
                placeholder={'Enter Branch Name'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
