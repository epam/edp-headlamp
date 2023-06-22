import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FormTextField } from '../../../FormComponents';
import { ClusterTokenProps } from './types';

const { Grid } = MuiCore;

export const ClusterToken = ({ names }: ClusterTokenProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.clusterToken.name, {
                    required: 'Enter cluster token',
                })}
                label={'Cluster Token'}
                placeholder={'Enter cluster token'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
