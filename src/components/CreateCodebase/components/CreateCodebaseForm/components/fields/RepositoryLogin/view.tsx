import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../../plugin.globals';
import { FormTextField } from '../../../../../../FormComponents/FormTextField';
import { RepositoryLoginProps } from './types';

const { Grid } = MuiCore;

export const RepositoryLogin = ({ names, handleFormFieldChange }: RepositoryLoginProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.repositoryLogin.name, {
                    required: 'Please specify repository login',
                    onBlur: handleFormFieldChange,
                })}
                label={'Repository Login'}
                title={'Please specify repository login'}
                placeholder={'Enter repository login'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
