import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
import { RepositoryUrlProps } from './types';

const { Grid } = MuiCore;

export const RepositoryUrl = ({ names, handleFormFieldChange }: RepositoryUrlProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.repositoryUrl.name, {
                    required:
                        'Please specify URL to Codebase in the following format: http(s)://git.sample.com/sample.git',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Git Repository URL'}
                title={
                    'Please specify URL to Codebase in the following format: http(s)://git.sample.com/sample.git'
                }
                placeholder={'http(s)://git.sample.com/sample.git'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
