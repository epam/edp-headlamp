import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretValues } from '../../../types';

export const ClusterToken = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageClusterSecretValues>();

    return (
        <Grid item xs={12}>
            <FormTextFieldPassword
                {...register(CLUSTER_CREATION_FORM_NAMES.clusterToken.name, {
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
