import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { FormTextField } from '../../../FormComponents';
import { ClusterCertificateProps } from './types';

const { Grid } = MuiCore;

export const ClusterCertificate = ({ names }: ClusterCertificateProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.clusterCertificate.name, {
                    required: 'Enter cluster certificate',
                })}
                label={'Cluster Certificate'}
                placeholder={'Enter cluster certificate'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
