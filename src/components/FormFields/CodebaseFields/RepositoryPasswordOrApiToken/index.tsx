import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { RepositoryPasswordOrApiTokenProps } from './types';

const { Grid } = MuiCore;

export const RepositoryPasswordOrApiToken = ({
    names,
    handleFormFieldChange,
}: RepositoryPasswordOrApiTokenProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.repositoryPasswordOrApiToken.name, {
                    required: 'Enter the repository password or access token',
                    pattern: {
                        value: /\w/,
                        message: 'Enter valid repository password or api token',
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Repository password or access token'}
                placeholder={'Enter the repository password or access token'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
