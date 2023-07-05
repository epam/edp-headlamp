import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../FormComponents';
import { ClusterHostProps } from './types';

export const ClusterHost = ({ names }: ClusterHostProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(names.clusterHost.name, {
                    required: 'Enter cluster host',
                })}
                label={'Cluster Host'}
                placeholder={'Enter cluster host'}
                control={control}
                errors={errors}
            />
        </Grid>
    );
};
