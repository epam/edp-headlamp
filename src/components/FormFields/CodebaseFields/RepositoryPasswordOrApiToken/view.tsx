import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents/FormTextField';
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
                    required: 'Provide repository password or API Token',
                    pattern: {
                        value: /\w/,
                        message: 'Please enter valid repository password or api token',
                    },
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Repository password (or API Token)'}
                title={'Provide repository password or API Token'}
                placeholder={'Enter repository password or API Token'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
