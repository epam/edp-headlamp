import { Grid } from '@mui/material';
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
          required: 'Enter the cluster URL assigned to the host.',
        })}
        label={'Cluster Host'}
        title={'Enter cluster’s endpoint URL (e.g., example -cluster-domain.com).'}
        placeholder={'Enter cluster host'}
        control={control}
        errors={errors}
      />
    </Grid>
  );
};
