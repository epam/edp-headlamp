import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretValues } from '../../../types';

export const ClusterCertificate = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageClusterSecretValues>();

  return (
    <FormTextField
      {...register(CLUSTER_CREATION_FORM_NAMES.clusterCertificate.name, {
        required: 'Paste the cluster certificate.',
      })}
      label={'Cluster Certificate'}
      title={
        'Provide a Kubernetes  certificate required for proper authentication. Take this certificate from the config file of the user you are going to access the cluster.'
      }
      placeholder={'Enter cluster certificate'}
      control={control}
      errors={errors}
    />
  );
};
