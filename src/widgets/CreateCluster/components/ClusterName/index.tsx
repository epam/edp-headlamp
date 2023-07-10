import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../components/FormComponents';
import { ClusterNameProps } from './types';

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
