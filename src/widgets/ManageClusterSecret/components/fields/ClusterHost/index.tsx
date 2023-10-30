import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretValues } from '../../../types';

export const ClusterHost = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageClusterSecretValues>();

    return (
        <Grid item xs={12}>
            <FormTextField
                {...register(CLUSTER_CREATION_FORM_NAMES.clusterHost.name, {
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
