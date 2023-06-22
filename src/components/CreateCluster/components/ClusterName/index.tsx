import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FormTextField } from '../../../FormComponents';
import { ClusterNameProps } from './types';

const { Grid } = MuiCore;

export const ClusterName = ({ names }: ClusterNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.clusterName.name, {
                    required: 'Enter cluster name',
                })}
                label={'Cluster Name'}
                placeholder={'Enter cluster name'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
