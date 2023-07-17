import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { ClusterCertificateProps } from './types';

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
