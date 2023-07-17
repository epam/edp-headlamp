import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';
import { ClusterTokenProps } from './types';

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
