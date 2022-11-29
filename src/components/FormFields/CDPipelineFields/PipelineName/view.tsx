import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { PipelineNameProps } from './types';

const { Grid } = MuiCore;

export const PipelineName = ({ names, handleFormFieldChange }: PipelineNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.name.name, {
                    required: `Pipeline name may contain only: lower-case letters, numbers and dashes
                                        and
                                        cannot start
                                        and end with dash and dot. Minimum 2 characters.
                                    `,
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Pipeline name'}
                placeholder={'Enter pipeline name'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
